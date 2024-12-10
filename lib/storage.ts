export const saveFile = async (key: string, data: string) => {
  // 将数据分块存储，每块 2MB
  const chunkSize = 2 * 1024 * 1024;
  const chunks = Math.ceil(data.length / chunkSize);
  
  // 清除之前的数据
  for (let i = 0; i < localStorage.length; i++) {
    const existingKey = localStorage.key(i);
    if (existingKey?.startsWith(`${key}_chunk`)) {
      localStorage.removeItem(existingKey);
    }
  }

  // 存储新的分块数据
  for (let i = 0; i < chunks; i++) {
    const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
    localStorage.setItem(`${key}_chunk_${i}`, chunk);
  }
  
  // 存储元数据
  localStorage.setItem(`${key}_meta`, JSON.stringify({
    chunks,
    totalSize: data.length
  }));
};

export const loadFile = (key: string): string | null => {
  try {
    const meta = localStorage.getItem(`${key}_meta`);
    if (!meta) return null;
    
    const { chunks } = JSON.parse(meta);
    let data = '';
    
    for (let i = 0; i < chunks; i++) {
      const chunk = localStorage.getItem(`${key}_chunk_${i}`);
      if (!chunk) return null;
      data += chunk;
    }
    
    return data;
  } catch (error) {
    console.error('Error loading file:', error);
    return null;
  }
}; 