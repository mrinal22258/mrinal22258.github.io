// Progressive image sequence preloader
export const preloadImageSequence = async ({
  frameCount,
  currentFrameUrlFn,
  criticalCount = 15,
  batchSize = 5,
  onProgress,
  onCriticalLoaded,
  imagesArrayRef
}) => {
  let loadedCount = 0;
  
  // Initialize array with correct size if it's empty
  if (!imagesArrayRef.current || imagesArrayRef.current.length === 0) {
    imagesArrayRef.current = new Array(frameCount).fill(null);
  }

  // 1. Load critical frames first (concurrently)
  const criticalPromises = [];
  const criticalLimit = Math.min(criticalCount, frameCount);

  for (let i = 0; i < criticalLimit; i++) {
    const img = new Image();
    img.src = currentFrameUrlFn(i);
    criticalPromises.push(
      new Promise((resolve) => {
        img.onload = () => {
          imagesArrayRef.current[i] = img;
          loadedCount++;
          if (onProgress) {
            onProgress(Math.floor((loadedCount / frameCount) * 100));
          }
          resolve();
        };
        img.onerror = () => {
          // Resolve anyway to avoid blocking execution
          loadedCount++;
          if (onProgress) {
            onProgress(Math.floor((loadedCount / frameCount) * 100));
          }
          resolve();
        };
      })
    );
  }

  await Promise.all(criticalPromises);
  
  // Critical frames loaded, notify component to start displaying
  if (onCriticalLoaded) {
    onCriticalLoaded();
  }

  // 2. Load remaining frames in small batches in the background
  const remainingIndices = [];
  for (let i = criticalLimit; i < frameCount; i++) {
    remainingIndices.push(i);
  }

  for (let i = 0; i < remainingIndices.length; i += batchSize) {
    const batch = remainingIndices.slice(i, i + batchSize);
    await Promise.all(
      batch.map((index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = currentFrameUrlFn(index);
          img.onload = () => {
            imagesArrayRef.current[index] = img;
            loadedCount++;
            if (onProgress) {
              onProgress(Math.floor((loadedCount / frameCount) * 100));
            }
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            if (onProgress) {
              onProgress(Math.floor((loadedCount / frameCount) * 100));
            }
            resolve();
          };
        });
      })
    );
  }
};

// Nearest loaded frame fallback lookup
export const getNearestLoadedFrame = (index, imagesArray) => {
  if (!imagesArray || imagesArray.length === 0) return null;
  
  // Clean bounds check
  const idx = Math.max(0, Math.min(index, imagesArray.length - 1));
  
  if (imagesArray[idx] && imagesArray[idx].complete && imagesArray[idx].naturalHeight !== 0) {
    return imagesArray[idx];
  }

  // Search outwards to find the nearest loaded frame
  let distance = 1;
  const maxLength = imagesArray.length;
  
  while (idx - distance >= 0 || idx + distance < maxLength) {
    if (idx - distance >= 0) {
      const img = imagesArray[idx - distance];
      if (img && img.complete && img.naturalHeight !== 0) return img;
    }
    if (idx + distance < maxLength) {
      const img = imagesArray[idx + distance];
      if (img && img.complete && img.naturalHeight !== 0) return img;
    }
    distance++;
  }
  
  // Fallback to the first available image
  for (let i = 0; i < maxLength; i++) {
    if (imagesArray[i] && imagesArray[i].complete && imagesArray[i].naturalHeight !== 0) {
      return imagesArray[i];
    }
  }
  
  return null;
};
