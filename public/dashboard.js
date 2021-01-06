import {redirection_handler} from './helper_functions/redirection_handler.js';
import {tableCreate} from './helper_functions/admin_options.js';
import {log} from './helper_functions/admin_options.js';
import {consolelog} from './helper_functions/admin_options.js';


window.addEventListener("load",
        async () => {
          //creates a table of recent new users
          await redirection_handler('/admin/dashboard/table',{method:"GET"},"formContent",tableCreate);
          //adding a delete option to buttons 
          let buttons = document.getElementsByClassName("button");
          for(var i = 0; i< buttons.length;i++){
              let button = buttons.item(i);
              button.addEventListener("click",async Event => {Event.stopImmediatePropagation();
                const data = {email:(button.parentNode).parentNode.childNodes[2].textContent};
                await redirection_handler('/admin/dashboard/table/delete',{method:"DELETE",headers: {
                  'Content-Type': 'application/json'
              },body:JSON.stringify(data)},"black",log);
                
              })
          }
          await redirection_handler('/admin/dashboard/active_users',{method:"GET"},"lastLogin",tableCreate);
        }

);
