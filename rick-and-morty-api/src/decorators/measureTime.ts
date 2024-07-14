export function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args: any[]) {
      const start = Date.now();
      const result = await originalMethod.apply(this, args);
      const end = Date.now();
      console.log(`${propertyKey} ejecutado en ${end - start}ms`);
      return result;
    };
  
    return descriptor;
  }
  