import { HasMethod, HasProperty } from 'src/lib/ericchase/Utility/Guard.js';

export function Compat_Blob(blob?: Blob) {
  return {
    get size(): Blob['size'] | undefined {
      return HasProperty(blob, 'size') ? blob.size : undefined;
    },
    get type(): Blob['type'] | undefined {
      return HasProperty(blob, 'type') ? blob.type : undefined;
    },
    arrayBuffer(): ReturnType<Blob['arrayBuffer']> | undefined {
      return HasMethod(blob, 'arrayBuffer') ? blob.arrayBuffer() : undefined;
    },
    // ! bytes is not available in most browsers
    bytes(): ReturnType<Blob['bytes']> | undefined {
      if (HasMethod(blob, 'bytes')) {
        return blob.bytes() ?? undefined;
      }
      if (HasMethod(blob, 'arrayBuffer')) {
        return (async () => {
          return new Uint8Array(await blob.arrayBuffer());
        })();
      }
    },
    slice(): ReturnType<Blob['slice']> | undefined {
      if (HasMethod(blob, 'slice')) {
        return blob.slice() ?? undefined;
      }
    },
    stream(): ReturnType<Blob['stream']> | undefined {
      if (HasMethod(blob, 'stream')) {
        return blob.stream() ?? undefined;
      }
    },
    text(): ReturnType<Blob['text']> | undefined {
      if (HasMethod(blob, 'text')) {
        return blob.text() ?? undefined;
      }
    },
  };
}
