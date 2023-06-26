import { Local } from '../models/Local.js';
class LocalService {

  static async findAll() {
    const objs = await Local.findAll({ include: { all: true, nested: true } });
    return objs;
  }

  static async findByPk(req) {
    const { id } = req.params;
    const obj = await Local.findByPk(id, { include: { all: true, nested: true } });
    return obj;
  }

  static async create(req) {
    const { qr, descricao , opcao1, opcao2 ,opcao3, opcao4, opcao5 } = req.body;
    const obj = await Local.create({ qr, descricao , opcao1, opcao2 ,opcao3, opcao4, opcao5 });
    return await Local.findByPk(obj.id, { include: { all: true, nested: true } });
  }

  static async update(req) {
    const { id } = req.params;
    const { qr, descricao , opcao1, opcao2 ,opcao3, opcao4, opcao5 } = req.body;
    const obj = await Local.findByPk(id, { include: { all: true, nested: true } });
    if (obj == null) throw 'Local não encontrado!';
    Object.assign(obj, { qr, descricao , opcao1, opcao2 ,opcao3, opcao4, opcao5  });
    return await obj.save();
  }

  static async delete(req) {
    const { id } = req.params;
    const obj = await Local.findByPk(id);
    if (obj == null) throw 'Local não encontrado!';
    try {
      await obj.destroy();
      return obj;
    } catch (error) {
      throw "Não é possível remover um Local que está sendo utilizado!";
    }
  }

}

export {LocalService};