/* eslint-disable indent */
export class UserRepository {
    constructor (dao) {
        this.dao = dao;
    }

    getAll = async ({ role }) => {
        return await this.dao.getAll({ role });
    };

    getById = async ({ id }) => {
        return await this.dao.getById({ id });
    };

    create = async ({ data }) => {
        return await this.dao.create({ data });
    };

    delete = async ({ id }) => {
        return await this.dao.delete({ id });
    };

    updatePartial = async ({ id, data }) => {
        return await this.dao.updatePartial({ id, data });
    };
}
