var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let results = fetch("https://newsapi.org/v2/top-headlines?source=bbc-news&language=en&q=COVID&from=2020-05-1&sortBy=publishedAt&apiKey=&pageSize=100&page=1", requestOptions)
    .then(response =>response.json())
    .then(result =>  { 
        console.log(result.articles);
        p = result.articles;
    html = ``;
    for(var i=0;i<10;i++){
     html += `
    <div class="container">
    <table>
    <tr>
     <td><img src = "${p[i].urlToImage}"</td>
     </tr>
    <tr class ="title">
    <td>${p[i].title}</td>
    </tr>
    <tr>
    <td class = "descrip"> ${p[i].description}</td>
    </tr>
    <tr><td> <a href="${p[i].url}">Read More..</a></td></tr> 
   </table>
   <hr> 
   </div>    
    `;

        }
        document.body.insertAdjacentHTML("beforeend", html);  
        return result;})
    .catch(error => console.log('error', error));



let items = results.articles;
console.log(items);
// async function FetchUsers() {

//     const resp = await fetch("https://newsapi.org/v2/top-headlines?source=bbc-news&language=en&q=COVID&from=2020-05-1&sortBy=publishedAt&apiKey=3d894e204a8341f7bb89d548ca8c1c8a&pageSize=100&page=1", requestOptions);
//     const data = await resp.JSON();
//     console.log(data);
    
// }