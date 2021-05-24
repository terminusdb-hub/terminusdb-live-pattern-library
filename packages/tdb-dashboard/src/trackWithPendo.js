

export function trackWithPendo (user) {
    
    if(!user) return null

    let visitor = {
        id: `user_${user["http://terminusdb.com/schema/system#agent_name"]}`,
        email: user.email,
        full_name: user.name,
        login_count: user["https://terminushub/loginsCount"]
    }

    return (function(apiKey){
        (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
        v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
            o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
            y=e.createElement(n);y.async=!0;y.src='https://cdn.eu.pendo.io/agent/static/'+apiKey+'/pendo.js';
            z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
 
            // Call this whenever information about your visitors becomes available
            // Please use Strings, Numbers, or Bools for value types.
            pendo.initialize({
                visitor: {
                     id: visitor.id,          // Required if user is logged in
                     email: visitor.email,       // Recommended if using Pendo Feedback, or NPS Email
                     full_name: visitor.full_name,   // Recommended if using Pendo Feedback
                     login_count: visitor.login_count

                    // You can add any additional visitor level key-values here,
                    // as long as it's not one of the above reserved names.
                }
            });
    })('461cb1df-7ec2-4bb6-79ae-13aad9ae0ee7');
}


/*

,

                account: {
                    //id:           'ACCOUNT-UNIQUE-ID' // Highly recommended
                    // name:         // Optional
                    // is_paying:    // Recommended if using Pendo Feedback
                    // monthly_value:// Recommended if using Pendo Feedback
                    // planLevel:    // Optional
                    // planPrice:    // Optional
                    // creationDate: // Optional

                    // You can add any additional account level key-values here,
                    // as long as it's not one of the above reserved names.
                }

*/                