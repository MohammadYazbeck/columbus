import {promises as fs} from 'fs';
import {NextResponse} from 'next/server';
import {lookup} from 'mime-types';
import {resolveUploadPath} from '@/src/lib/upload';

type Params = {
  params: {path: string[]};
};

export async function GET(_request: Request, {params}: Params) {
  try {
    const resource = params.path.join('/');
    const absolute = resolveUploadPath(resource);
    const data = await fs.readFile(absolute);
    const mime = lookup(absolute) || 'application/octet-stream';
    return new NextResponse(data, {
      headers: {'Content-Type': mime as string, 'Cache-Control': 'public, max-age=86400'}
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'File not found'}, {status: 404});
  }
}
