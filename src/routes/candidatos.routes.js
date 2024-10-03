import { Router } from "express";

const candidatosRoutes = Router();

let candidatos = [
    { id: Math.floor(Math.random() * 100000),
      nome: "Adriana Ribeiro",
      partido: "Partido aleatório",
      idade: 36,
      segundo: true, // Concorrente ao segundo turno
      proposta: [
        "Aumento do salário",
        "Redução de impostos",
        "Aumento de carga horária de sono",
      ],
    },

];

//Rota para buscar todas as candidatos
candidatosRoutes.get("/", (req, res) => {
    return res.status(200)
    .send( candidatos );
});

//Rota para criar uma nova candidatos
candidatosRoutes.post("/", (req, res) => {
    const { nome, partido, idade, segundo, proposta} = req.body

    if(!nome || !partido){
        return res.status(400).send ({
            message:"O nome ou partido não foi preenchido!!"
        });
    }

    //Maior de idade
    if( idade < 18 ){
        return res.status(400).send ({message:"O candidato não possui idade suficiente para participar!"});
    }

    const novoCandidato = {
         id: candidatos.length + 1, 
         nome: nome,
         partido: partido,
         idade: idade,
         segundo: segundo,
         proposta : proposta

    };

    candidatos.push(novoCandidato);
    return res.status(201).json ({
        message: "Candidato cadastrado com sucesso"
    });
});

candidatosRoutes.get("/:id", (req,res) => {
     const { id } = req.params; 

 // console.log(id);

 const candidato  = candidatos.find( (candidates) => candidates.id == id )

 if (!candidato) {
     return res.status (404).send ({
          message: "Candidato não encontrado!",
     });
 }

 return res.status(200).send ({
     message: "Candidato encontrado",
     candidato,
 });
});












candidatosRoutes.put("/:id", (req, res) => {
    const { id } = req.params; 
    const { nome, partido, idade, segundo, proposta} = req.body;

    const candidato  = candidatos.find( (candidates) => candidates.id == id );

    if (!candidato) {
        return res.status (404).send ({
             message: "Candidato não Encontrado!",
        });
    }

    candidato.nome = nome;
    candidato.partido = partido;
    candidato.idade = idade;
    candidato.segundo = segundo;
    candidato.proposta = proposta;

    return res.status(200).send ({
        message: "Candidato Atualizado!",
        candidato,
    });

});
  
candidatosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params; 

    const candidato  = candidatos.find((candidates) => candidates.id == id );

    if (!candidato) {
        return res.status (404).send ({message: "Candidato não encontrado!"});
    }

   candidatos = candidatos.filter((candidates) => candidates.id != id )

    return res.status(200).send ({
        message: "Candidato Deletado!",
        candidato,
    });
});


export default candidatosRoutes;