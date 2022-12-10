import { TestBed } from '@angular/core/testing';

import { SidebarToggleService } from './sidenav-toggle.service';

describe('SidebarToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidebarToggleService = TestBed.get(SidebarToggleService);
    expect(service).toBeTruthy();
  });
});
