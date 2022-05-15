import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'lbp_group',
    timestamps: false,
    freezeTableName: true
})
export default class LbpGroup extends Model<LbpGroup> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.STRING)
    declare description: string;

    @Column(DataType.STRING)
    declare image_url: string;

    @Column(DataType.STRING)
    declare link: string;

    @Column(DataType.INTEGER)
    declare seq: number;

    @Column(DataType.INTEGER)
    declare deleted: number;
}
