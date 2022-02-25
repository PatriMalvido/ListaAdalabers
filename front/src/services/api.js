const callToApi = () => {
   
  return fetch('//localhost:4000/adalabers',
  {
    method: 'GET',
  } 
  )
  .then(response => response.json())
  .then(data => {
     return data;
  });
}

  export default callToApi;