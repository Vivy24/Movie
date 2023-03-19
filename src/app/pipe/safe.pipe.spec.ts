import { async, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('Pipe: SafeResourceUrl', () => {
  let domSanitizer: DomSanitizer;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SafePipe],
      providers: [
        SafePipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: () => 'html',
            bypassSecurityTrustStyle: () => 'style',

            bypassSecurityTrustScript: () => 'script',

            bypassSecurityTrustUrl: () => 'URL',
            bypassSecurityTrustResourceUrl: () => 'resourceURl',
          },
        },
      ],
    });
    domSanitizer = TestBed.get(DomSanitizer);
  }));

  it('should create an instance', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
  it('should transform html case', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe.transform('url@.com', 'html')).toBe('html');
  });

  it('should transform style case', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe.transform('url@.com', 'style')).toBe('style');
  });

  it('should transform script case', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe.transform('url@.com', 'script')).toBe('script');
  });

  it('should transform url case', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe.transform('url@.com', 'url')).toBe('URL');
  });

  it('should transform resourceUrl case', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe.transform('url@.com', 'resourceUrl')).toBe('resourceURl');
  });

  it('should transform default case', () => {
    const pipe = new SafePipe(domSanitizer);
    expect(pipe.transform('url@.com', 'default')).toBe('html');
  });
});
