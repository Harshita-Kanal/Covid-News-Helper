var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://www.who.int/rss-feeds/news-english.xml", requestOptions)
    .then(response => response.text())
    .then(str =>new window.DOMParser().parseFromString(str, "text/xml"))
    .then(result => {console.log(result)
   const items = result.querySelectorAll("item");
   let html = ``;
   items.forEach(el => {
    html += `
    <div class="container">
    <table>
    <tr class="title">
    <td>${el.querySelector("title").innerHTML}</td>
    </tr>
    <tr><td><a href="${el.querySelector("link").innerHTML}">Visit</a></td>
    </tr> 
   </table>
   <hr> 
   </div>    
    `;

   }); 
    
  document.body.insertAdjacentHTML("beforeend",html);  
    
    });
   // .catch(error => console.log('error', error));
