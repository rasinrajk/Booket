import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'main', src: './../../assets/js/mainScript.js' },
  { name: 'mainjQ', src: './../../assets/lib/jquery/jquery.min.js' },
  { name: 'jQui', src: './../../assets/lib/jqueryui/jquery-ui.min.js' },
  {
    name: 'bsBundle',
    src: './../../assets/lib/bootstrap/js/bootstrap.bundle.min.js'
  },
  { name: 'icons', src: './../../assets/lib/feather-icons/feather.min.js' },
  {
    name: 'perfectScroll',
    src: './../../assets/lib/perfect-scrollbar/perfect-scrollbar.min.js'
  },
  { name: 'jQfloat', src: './../../assets/lib/jquery.flot/jquery.flot.js' },
  {
    name: 'jQfloatStack',
    src: './../../assets/lib/jquery.flot/jquery.flot.stack.js'
  },
  {
    name: 'jQfloatResize',
    src: './../../assets/lib/jquery.flot/jquery.flot.resize.js'
  },
  { name: 'quill', src: './../../assets/lib/quill/quill.min.js' },
  { name: 'moment', src: './../../assets/lib/moment/min/moment.min.js' },
  {
    name: 'fullcalendar',
    src: './../../assets/lib/fullcalendar/fullcalendar.min.js'
  },
  { name: 'calendar', src: './../../assets/js/calendar.js' },
  { name: 'calendarEvents', src: './../../assets/js/calendar-events.js' },
  { name: 'cookie', src: './../../assets/lib/js-cookie/js.cookie.js' }
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach(script => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {
          // IE
          script.onreadystatechange = () => {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {
          // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}
