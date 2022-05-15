import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'lbp_pool',
    timestamps: false,
    freezeTableName: true
})
export default class LbpPool extends Model<LbpPool> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column(DataType.INTEGER)
    declare network_id: number;

    @Column(DataType.INTEGER)
    declare group_id: number;

    @Column(DataType.STRING)
    declare lbp_name: string;

    @Column(DataType.STRING)
    declare lbp_symbol: string;

    @Column(DataType.STRING)
    declare main_token: string;

    @Column(DataType.STRING)
    declare base_token: string;

    @Column(DataType.STRING)
    declare image_url: string;

    @Column(DataType.STRING)
    declare description: string;

    @Column(DataType.STRING)
    declare learn_more_url: string;

    @Column(DataType.STRING)
    declare owner_address: string;

    @Column(DataType.STRING)
    declare lbp_creation_tx: string;

    @Column(DataType.STRING)
    declare pool_id: string;

    @Column(DataType.STRING)
    declare pool_address?: string;

    @Column(DataType.STRING)
    declare swap_fee: string;

    @Column(DataType.STRING)
    declare price: string;

    @Column(DataType.INTEGER)
    declare start_time: number;

    @Column(DataType.INTEGER)
    declare end_time: number;

    @Column(DataType.STRING)
    declare blocked_countries: string;

    @Column(DataType.INTEGER)
    declare seq: number;

    @Column(DataType.INTEGER)
    declare deleted: number;
}
