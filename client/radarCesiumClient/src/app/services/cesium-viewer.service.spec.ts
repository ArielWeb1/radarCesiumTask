import { TestBed, inject } from '@angular/core/testing';

import { CesiumViewerService } from './cesium-viewer.service';

describe('CesiumViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CesiumViewerService]
    });
  });

  it('should be created', inject([CesiumViewerService], (service: CesiumViewerService) => {
    expect(service).toBeTruthy();
  }));
});
