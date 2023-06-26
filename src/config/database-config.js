// Configuração do banco de dados no ambiente de teste
export const databaseConfig = {
    username: 'root',
    password: '',
    database: 'acessibilidade',
    host: '127.0.0.1',
    dialect: 'mysql',   
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  };

  /*
  // Configuração do banco de dados no ambiente de desenvolvimento
  export const databaseConfig = {
    username: 'root',
    password: null,
    database: 'meuscustos',
    host: '127.0.0.1',
    dialect: 'mysql',    
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  };
  */
  
  /*
  // Configuração do banco de dados no ambiente de produção
  export const databaseConfig = {
    username: 'root',
    password: null,
    database: 'meuscustos',
    host: '127.0.0.1',
    dialect: 'mysql',    
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true
    }
  };
  */
  