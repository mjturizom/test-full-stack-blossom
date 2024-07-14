import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    const referer = req.get('Referer') ?? 'No Referer';
    const userAgent = req.get('User-Agent') ?? 'No User-Agent';
    const clientIp = req.ip ?? 'unknown';

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Referer: ${referer} - User-Agent: ${userAgent} - Client IP: ${clientIp}`);

    next();
};

export default logger;
