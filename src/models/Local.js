import { Model, DataTypes } from 'sequelize';
class Local extends Model {

  static init(sequelize) {
    super.init({
      qr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,        
      },
      opcao1: {
        type: DataTypes.TEXT,
        allowNull: false,        
      },
      opcao2: {
        type: DataTypes.TEXT,
        allowNull: false,        
      },
      opcao3: {
        type: DataTypes.TEXT,
        allowNull: false,        
      },
      opcao4: {
        type: DataTypes.TEXT,
        allowNull: false,        
      },
      opcao5: {
        type: DataTypes.TEXT,
        allowNull: false,        
      },     
    }, { sequelize, modelName: 'local', tableName: 'locais' }
    )
  }

  static associate(models) {
  }
}

export { Local };