$("form").on("submit", function(ev){
    //evitamos que el formulario se recargue
    ev.preventDefault();
    //se crea variables para obtener valores del formulario
    const username = $("#nombre").val();
    const pagina = $("#pagina").val();
    const repoPagina = $("#repoPagina").val();

    getUser(username);
    getRepos(username);

    
})
async function getRepos(username){
    try {
        const repos = await request(`${username}/repos`);
        const link = `https://www.github.com/${username}/`;
        
        
        for(rep of repos){
            const link2 = link.concat(rep.name);
            $("#repoPagina").append(
            `<a class="text-white" href="${link2}" target="_blank">${rep.name}</a><br>`
            );
        }
        
    } catch (error) {
        console.log("error de llamada");
        console.log("error.message");
    }

}
async function getUser(username){
    const usuarioGit = await request(username)
    
    $("#resultados").html(`
        <img src= ${usuarioGit.avatar_url} alt="avatar" Class="text-center w-50">
        <div class= "lead font-weight-bold text-center text-white">
        <p>Nombre de Ususario: ${usuarioGit.name}</p>
        <p>Nombre de Login: ${usuarioGit.login}</p>
        <p>Cantidad de Repositorio: ${usuarioGit.public_repos}</p>
        <p>Localidad: ${usuarioGit.location}</p>
        <p>Tipo de Usuario: ${usuarioGit.type}</p>
        </div>
    `);
}

async function request (resto_url){
        
    try {            
        const  url = `https://api.github.com/users/${resto_url}`;
        const datos = await fetch(url);
        const datosGithub = await datos.json();
        console.log(datosGithub);
        return datosGithub;
    } catch (error) {
        console.log("no se completo la accion", error)
    }
        
}


