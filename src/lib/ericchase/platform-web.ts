import { Core_Stream_Uint8_Async_ReadSome } from './core.js';

class ClassCompatBlob {
  constructor(public blob: Blob) {}
  get size(): number | undefined {
    return this.blob.size ?? undefined;
  }
  get type(): string | undefined {
    return this.blob.type ?? undefined;
  }
  async arrayBuffer(): Promise<ArrayBuffer | undefined> {
    return (await this.blob.arrayBuffer?.()) ?? undefined;
  }
  /** `bytes` is not available in most browsers */
  async bytes(): Promise<Uint8Array | undefined> {
    return (await this.blob.bytes?.()) ?? (await this.blob.arrayBuffer?.().then((buffer) => (buffer ? new Uint8Array(buffer) : undefined))) ?? undefined;
  }
  slice(): Blob | undefined {
    return this.blob.slice?.() ?? undefined;
  }
  stream(): ReadableStream<any> | undefined {
    return this.blob.stream?.() ?? undefined;
  }
  async text(): Promise<string | undefined> {
    return (await this.blob.text?.()) ?? undefined;
  }
}

class ClassCompatDataTransfer {
  constructor(public dataTransfer: DataTransfer) {}
  items(): ClassCompatDataTransferItem[] {
    const list: ClassCompatDataTransferItem[] = [];
    for (const item of this.dataTransfer.items) {
      list.push(WebPlatform_DataTransferItem_ClassCompat_DataTransferItem(item));
    }
    return list;
  }
}

class ClassCompatDataTransferItem {
  constructor(public item: DataTransferItem) {}
  getAsEntry(): FileSystemEntry | undefined {
    if (this.item.kind === 'file') {
      // @ts-expect-error: `getAsEntry` does not exist.
      return this.item.getAsEntry?.() ?? this.item.webkitGetAsEntry?.() ?? undefined;
    }
  }
  getAsFile(): File | undefined {
    if (this.item.kind === 'file') {
      return this.item.getAsFile?.() ?? undefined;
    }
  }
  /** `callback` might never be called */
  getAsString(callback: (data: string) => void): void {
    if (this.item.kind === 'string') {
      this.item.getAsString?.(callback);
    }
  }
}

class ClassCompatFile {
  constructor(public file: File) {}
  get relativePath(): string | undefined {
    // @ts-expect-error: `relativePath` does not exist.
    return this.file.relativePath ?? this.file.webkitRelativePath ?? undefined;
  }
}

class ClassDomAttributeObserver {
  constructor({
    source = document.documentElement,
    options = { attributeOldValue: true, subtree: true },
  }: {
    source?: Node;
    options?: {
      attributeFilter?: string[];
      attributeOldValue?: boolean;
      subtree?: boolean;
    };
  }) {
    this.mutationObserver = new MutationObserver((mutationRecords: MutationRecord[]) => {
      for (const record of mutationRecords) {
        this.send(record);
      }
    });
    this.mutationObserver.observe(source, {
      attributes: true,
      attributeFilter: options.attributeFilter,
      attributeOldValue: options.attributeOldValue ?? true,
      subtree: options.subtree ?? true,
    });
  }
  public subscribe(callback: (record: MutationRecord, unsubscribe: () => void) => void): () => void {
    this.subscriptionSet.add(callback);
    return () => {
      this.subscriptionSet.delete(callback);
    };
  }
  protected mutationObserver: MutationObserver;
  protected subscriptionSet = new Set<(record: MutationRecord, unsubscribe: () => void) => void>();
  private send(record: MutationRecord) {
    for (const callback of this.subscriptionSet) {
      callback(record, () => {
        this.subscriptionSet.delete(callback);
      });
    }
  }
}

class ClassDomCharacterDataObserver {
  constructor({ source = document.documentElement, options = { characterDataOldValue: true, subtree: true } }: { source?: Node; options?: { characterDataOldValue?: boolean; subtree?: boolean } }) {
    this.mutationObserver = new MutationObserver((mutationRecords: MutationRecord[]) => {
      for (const record of mutationRecords) {
        this.send(record);
      }
    });
    this.mutationObserver.observe(source, {
      characterData: true,
      characterDataOldValue: options.characterDataOldValue ?? true,
      subtree: options.subtree ?? true,
    });
  }
  public subscribe(callback: (record: MutationRecord, unsubscribe: () => void) => void): () => void {
    this.subscriptionSet.add(callback);
    return () => {
      this.subscriptionSet.delete(callback);
    };
  }
  protected mutationObserver: MutationObserver;
  protected subscriptionSet = new Set<(record: MutationRecord, unsubscribe: () => void) => void>();
  private send(record: MutationRecord) {
    for (const callback of this.subscriptionSet) {
      callback(record, () => {
        this.subscriptionSet.delete(callback);
      });
    }
  }
}

class ClassDomChildListObserver {
  constructor({ source = document.documentElement, options = { subtree: true } }: { source?: Node; options?: { subtree?: boolean } }) {
    this.mutationObserver = new MutationObserver((mutationRecords: MutationRecord[]) => {
      for (const record of mutationRecords) {
        this.send(record);
      }
    });
    this.mutationObserver.observe(source, {
      childList: true,
      subtree: options.subtree ?? true,
    });
  }
  public subscribe(callback: (record: MutationRecord, unsubscribe: () => void) => void): () => void {
    this.subscriptionSet.add(callback);
    return () => {
      this.subscriptionSet.delete(callback);
    };
  }
  protected mutationObserver: MutationObserver;
  protected subscriptionSet = new Set<(record: MutationRecord, unsubscribe: () => void) => void>();
  private send(record: MutationRecord) {
    for (const callback of this.subscriptionSet) {
      callback(record, () => {
        this.subscriptionSet.delete(callback);
      });
    }
  }
}

class ClassDomElementAddedObserver {
  constructor({ source = document.documentElement, options = { subtree: true }, selector, includeExistingElements = true }: { source?: Node; options?: { subtree?: boolean }; selector: string; includeExistingElements?: boolean }) {
    this.mutationObserver = new MutationObserver((mutationRecords: MutationRecord[]) => {
      for (const record of mutationRecords) {
        if (record.target instanceof Element && record.target.matches(selector)) {
          this.send(record.target);
        }
        const treeWalker = document.createTreeWalker(record.target, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
          if ((treeWalker.currentNode as Element).matches(selector)) {
            this.send(treeWalker.currentNode as Element);
          }
        }
      }
    });
    this.mutationObserver.observe(source, {
      childList: true,
      subtree: options.subtree ?? true,
    });
    if (includeExistingElements === true) {
      const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
      while (treeWalker.nextNode()) {
        if ((treeWalker.currentNode as Element).matches(selector)) {
          this.send(treeWalker.currentNode as Element);
        }
      }
    }
  }
  public disconnect() {
    this.mutationObserver.disconnect();
    for (const callback of this.subscriptionSet) {
      this.subscriptionSet.delete(callback);
    }
  }
  public subscribe(callback: (element: Element, unsubscribe: () => void) => void): () => void {
    this.subscriptionSet.add(callback);
    let abort = false;
    for (const element of this.matchSet) {
      callback(element, () => {
        this.subscriptionSet.delete(callback);
        abort = true;
      });
      if (abort) return () => {};
    }
    return () => {
      this.subscriptionSet.delete(callback);
    };
  }
  protected mutationObserver: MutationObserver;
  protected matchSet = new Set<Element>();
  protected subscriptionSet = new Set<(element: Element, unsubscribe: () => void) => void>();
  private send(element: Element) {
    if (!this.matchSet.has(element)) {
      this.matchSet.add(element);
      for (const callback of this.subscriptionSet) {
        callback(element, () => {
          this.subscriptionSet.delete(callback);
        });
      }
    }
  }
}

class ClassNodeReference {
  node: Node;
  constructor(node?: Node | null) {
    if (node === null) {
      throw new ReferenceError('Reference is null.');
    }
    if (node === undefined) {
      throw new ReferenceError('Reference is undefined.');
    }
    this.node = node;
  }
  as<T extends abstract new (...args: any) => any>(constructor_ref: T): InstanceType<T> {
    if (this.node instanceof constructor_ref) return this.node as InstanceType<T>;
    throw new TypeError(`Reference node is not ${constructor_ref}`);
  }
  is<T extends abstract new (...args: any) => any>(constructor_ref: T): boolean {
    return this.node instanceof constructor_ref;
  }
  passAs<T extends abstract new (...args: any) => any>(constructor_ref: T, fn: (reference: InstanceType<T>) => void): void {
    if (this.node instanceof constructor_ref) {
      fn(this.node as InstanceType<T>);
    }
  }
  tryAs<T extends abstract new (...args: any) => any>(constructor_ref: T): InstanceType<T> | undefined {
    if (this.node instanceof constructor_ref) {
      return this.node as InstanceType<T>;
    }
  }
  get classList() {
    return this.as(HTMLElement).classList;
  }
  get className() {
    return this.as(HTMLElement).className;
  }
  get style() {
    return this.as(HTMLElement).style;
  }
  getAttribute(qualifiedName: string): string | null {
    return this.as(HTMLElement).getAttribute(qualifiedName);
  }
  setAttribute(qualifiedName: string, value: string): void {
    this.as(HTMLElement).setAttribute(qualifiedName, value);
  }
  getStyleProperty(property: string): string {
    return this.as(HTMLElement).style.getPropertyValue(property);
  }
  setStyleProperty(property: string, value: string | null, priority?: string): void {
    this.as(HTMLElement).style.setProperty(property, value, priority);
  }
}

class ClassNodeReferenceList extends Array<ClassNodeReference> {
  constructor(nodes?: NodeList | Node[] | null) {
    if (nodes === null) {
      throw new ReferenceError('Reference list is null.');
    }
    if (nodes === undefined) {
      throw new ReferenceError('Reference list is undefined.');
    }
    super();
    for (const node of Array.from(nodes)) {
      try {
        this.push(new ClassNodeReference(node));
      } catch (_) {}
    }
  }
  as<T extends abstract new (...args: any) => any>(constructor_ref: T): Array<InstanceType<T>> {
    return this.filter((ref) => ref.is(constructor_ref)).map((ref) => ref.as(constructor_ref));
  }
  passEachAs<T extends abstract new (...args: any) => any>(constructor_ref: T, fn: (reference: InstanceType<T>) => void): void {
    for (const ref of this) {
      ref.passAs(constructor_ref, fn);
    }
  }
}

// Exports

export function WebPlatform_Blob_Async_ReadSome(blob: Blob, count: number): Promise<Uint8Array> {
  const stream = WebPlatform_Blob_ClassCompat_Blob(blob).stream();
  if (stream !== undefined) {
    return Core_Stream_Uint8_Async_ReadSome(stream, count);
  }
  return Promise.resolve(new Uint8Array());
}

export function WebPlatform_Blob_ClassCompat_Blob(blob: Blob): ClassCompatBlob {
  return new ClassCompatBlob(blob);
}

export function WebPlatform_CSS_ToAdjustedEm(em: number, root: HTMLElement | SVGElement = document.documentElement): number {
  const fontSizePx = Number.parseInt(getComputedStyle(root).fontSize);
  return (16 / fontSizePx) * em;
}

export function WebPlatform_CSS_ToRelativeEm(em: number, root: HTMLElement | SVGElement = document.documentElement): number {
  const fontSizePx = Number.parseInt(getComputedStyle(root).fontSize);
  return (fontSizePx / 16) * em;
}

export function WebPlatform_CSS_ToRelativePx(px: number, root: HTMLElement | SVGElement = document.documentElement): number {
  const fontSizePx = Number.parseInt(getComputedStyle(root).fontSize);
  return (fontSizePx / 16) * px;
}

export async function* WebPlatform_DataTransfer_AsyncGen_GetEntries(dataTransfer: DataTransfer): AsyncGenerator<FileSystemEntry> {
  const entries: FileSystemEntry[] = [];
  // get top-level entries
  for (const item of dataTransfer.items) {
    const entry = WebPlatform_DataTransferItem_ClassCompat_DataTransferItem(item).getAsEntry();
    if (entry !== undefined) {
      entries.push(entry);
    }
  }
  // recurse through each sub-level
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];
    yield entry;
    // `FileSystemDirectoryEntry` does not exist in all browsers
    if (entry.isDirectory === true) {
      entries.push(...(await WebPlatform_FileSystemEntry_Async_ReadDirectoryEntries(entry as FileSystemDirectoryEntry)));
    }
  }
}

export async function* WebPlatform_DataTransfer_AsyncGen_GetFiles(dataTransfer: DataTransfer): AsyncGenerator<File> {
  for await (const entry of WebPlatform_DataTransfer_AsyncGen_GetEntries(dataTransfer)) {
    // `FileSystemFileEntry` does not exist in all browsers
    if (entry.isFile === true) {
      yield await WebPlatform_FileSystemEntry_Async_GetFile(entry as FileSystemFileEntry);
    }
  }
}

export function WebPlatform_DataTransfer_ClassCompat_DataTransfer(dataTransfer: DataTransfer): ClassCompatDataTransfer {
  return new ClassCompatDataTransfer(dataTransfer);
}

export function WebPlatform_DataTransferItem_ClassCompat_DataTransferItem(item: DataTransferItem): ClassCompatDataTransferItem {
  return new ClassCompatDataTransferItem(item);
}

export function WebPlatform_DOM_Class_AttributeObserver({
  options = { attributeOldValue: true, subtree: true },
  source = document.documentElement,
}: {
  options?: {
    attributeFilter?: string[];
    attributeOldValue?: boolean;
    subtree?: boolean;
  };
  source?: Node;
}): ClassDomAttributeObserver {
  return new ClassDomAttributeObserver({ options, source });
}

export function WebPlatform_DOM_Class_CharacterDataObserver({ options = { characterDataOldValue: true, subtree: true }, source = document.documentElement }: { options?: { characterDataOldValue?: boolean; subtree?: boolean }; source?: Node }): ClassDomCharacterDataObserver {
  return new ClassDomCharacterDataObserver({ options, source });
}

export function WebPlatform_DOM_Class_ChildListObserver({ options = { subtree: true }, source = document.documentElement }: { options?: { subtree?: boolean }; source?: Node }): ClassDomChildListObserver {
  return new ClassDomChildListObserver({ options, source });
}

export function WebPlatform_DOM_Class_ElementAddedObserver({ includeExistingElements = true, options = { subtree: true }, selector, source = document.documentElement }: { includeExistingElements?: boolean; options?: { subtree?: boolean }; selector: string; source?: Node }): ClassDomElementAddedObserver {
  return new ClassDomElementAddedObserver({ includeExistingElements, options, selector, source });
}

export function WebPlatform_DOM_InjectCSS(styles: string): CSSStyleSheet {
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(styles);
  document.adoptedStyleSheets.push(stylesheet);
  return stylesheet;
}

export function WebPlatform_DOM_InjectScript(code: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.textContent = code;
  document.body.appendChild(script);
  return script;
}

export function WebPlatform_File_ClassCompat_File(file: File): ClassCompatFile {
  return new ClassCompatFile(file);
}

export function WebPlatform_FileSystemEntry_Async_GetFile(entry: FileSystemFileEntry): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    entry.file(
      (file) => {
        resolve(file);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

export async function WebPlatform_FileSystemEntry_Async_ReadDirectoryEntries(entry: FileSystemDirectoryEntry): Promise<FileSystemEntry[]> {
  const reader = entry.createReader();
  const allentries: FileSystemEntry[] = [];
  let done = false;
  while (done === false) {
    const entries = await new Promise<FileSystemEntry[]>((resolve, reject) => {
      reader.readEntries(
        (entries) => {
          resolve(entries);
        },
        (error) => {
          reject(error);
        },
      );
    });
    if (entries.length === 0) {
      break;
    }
    allentries.push(...entries);
  }
  return allentries;
}

export function WebPlatform_HTMLInputElement_WebkitDirectoryIsSupported(): boolean {
  return WebPlatform_Utility_DeviceIsMobile() ? false : true;
}

export function WebPlatform_Node_Class_NodeListReference(nodes?: NodeList | Node[] | null): ClassNodeReferenceList {
  return new ClassNodeReferenceList(nodes);
}

export function WebPlatform_Node_Class_NodeReference(node?: Node | null): ClassNodeReference {
  return new ClassNodeReference(node);
}

export function WebPlatform_Node_SelectElement(selector: string): ClassNodeReference {
  // API designed by NOOB (https://github.com/NOOB2868)
  return WebPlatform_Node_Class_NodeReference(document.querySelector(selector));
}

export function WebPlatform_Node_SelectElements(...selectors: string[]): ClassNodeReferenceList {
  return WebPlatform_Node_Class_NodeListReference(document.querySelectorAll(selectors.join(',')));
}

export function WebPlatform_Utility_DeviceIsMobile(): boolean {
  return /android|iphone|mobile/i.test(window.navigator.userAgent);
}

export function WebPlatform_Utility_Download(
  data: {
    blob?: Blob;
    bytes?: Uint8Array<ArrayBuffer>;
    json?: string;
    text?: string;
    url?: string;
  },
  filename: string,
): void {
  const dataurl = (() => {
    if (data.blob !== undefined) {
      return URL.createObjectURL(data.blob);
    }
    if (data.bytes !== undefined) {
      return URL.createObjectURL(new Blob([data.bytes], { type: 'application/octet-stream;charset=utf-8' }));
    }
    if (data.json !== undefined) {
      return URL.createObjectURL(new Blob([data.json], { type: 'application/json;charset=utf-8' }));
    }
    if (data.text !== undefined) {
      return URL.createObjectURL(new Blob([data.text], { type: 'text/plain;charset=utf-8' }));
    }
    if (data.url !== undefined) {
      return data.url;
    }
  })();
  if (dataurl !== undefined) {
    const anchor = document.createElement('a');
    anchor.setAttribute('download', filename);
    anchor.setAttribute('href', dataurl);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}

export function WebPlatform_Utility_OpenWindow(
  url: string, //
  onLoad?: (proxy: Window, event: Event) => void,
  onUnload?: (proxy: Window, event: Event) => void,
): void {
  const proxy = window.open(url, '_blank');
  if (proxy) {
    if (onLoad) {
      proxy.addEventListener('load', (event: Event) => {
        onLoad(proxy, event);
      });
    }
    if (onUnload) {
      proxy.addEventListener('unload', (event: Event) => {
        onUnload(proxy, event);
      });
    }
  }
}
