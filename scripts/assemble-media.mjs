import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(readFileSync(new URL('media-source/manifest.json',root),'utf8'));
const video=Buffer.concat(manifest.parts.map(part=>readFileSync(new URL('media-source/'+part,root))));
if(createHash('sha256').update(video).digest('hex')!==manifest.sha256)throw new Error('Cinema source checksum mismatch');
mkdirSync(new URL('static/media/',root),{recursive:true});
writeFileSync(new URL('static/media/bored-cinema-4k.mp4',root),video);
console.log('Assembled original cinema video; checksum verified.');
