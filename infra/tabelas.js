// Classe recebe uma conexão
class Tabelas {
  init(conexao) {
    // Trazer a conexão para o escopo desta classe
    this.conexao = conexao;

    // Executar o método de criar a tabela
    this.criarVideos();
  }

  // Método para criar vídeos no Aluraflix
  criarVideos() {
    // SQL de criação da tabela com chaves
    const sql =
      "CREATE TABLE IF NOT EXISTS Videos (id int NOT NULL AUTO_INCREMENT, titulo varchar(100) NOT NULL, descricao text NOT NULL, categoria varchar(50), url text NOT NULL, PRIMARY KEY(id))";

    // Passa o SQL para a conexão
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Videos criada com sucesso");
      }
    });
  }
}
// Exporta a classe já instanciada para usar em outros locais
module.exports = new Tabelas();
