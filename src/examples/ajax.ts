import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export default function() {
  const rootEl: HTMLElement = document.querySelector('#root');


  const users = ajax.get(`https://api.github.com/users?per_page=2`);
  users
  .pipe(
    map(res => res.response)
    )
    .subscribe(
      res => {
        res.forEach((element: any) => {
          const div = document.createElement('div');
          div.innerHTML = `
            <h2>${element.login}</h2>
            <img src="${element.avatar_url}"/>
          `;
          rootEl.appendChild(div);
        });
      }
    );
}
