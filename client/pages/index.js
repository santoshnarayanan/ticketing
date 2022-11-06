import axios from "axios";

const LandingPage = ({currentUser})=>{
    //console.log(currentUser);
    //axios.get('/api/users/currentuser');
    return <h1>Landing Page</h1>;
};

//always on server side rendering
 LandingPage.getInitialProps = async () =>{
    //const response = await axios.get('/api/users/currentuser');
    //return response.data;
     if(typeof window === 'undefined'){
         //we are on the server
         //requests should be made to http://service.namespace....
         const {data} = await axios.get(
             'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
             {
                 headers: {
                     Host:'ticketing.local'
                 }
             }
         );
         return data;
     }
     else {
         //we are on the browser request can be made with base url of ''
         const {data} = await axios.get('/api/users/currentuser');
         return data;
     }
     //console.log("I was executed");
     return{};
};

export default  LandingPage;