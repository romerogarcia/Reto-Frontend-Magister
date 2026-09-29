import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * React Router no distinguía mayúsculas (/Specialized == /specialized).
 * Este serializer replica ese comportamiento.
 */
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    const [path, rest = ''] = url.split(/(?=[?#])/);
    return super.parse(path.toLowerCase() + rest);
  }
}
