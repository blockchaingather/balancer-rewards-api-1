import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'every_week_need_reward_user_snapshot',
    timestamps: false,
    freezeTableName: true
})
export default class liquidityMining extends Model<liquidityMining> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id?: number;

    @Column(DataType.INTEGER)
    chain_id?: number;

    @Column(DataType.STRING)
    pool_address?: string;

    @Column(DataType.STRING)
    token_address?: string;

    @Column(DataType.STRING)
    user_address?: string;

    @Column(DataType.STRING)
    current_estimate?: string;

    @Column(DataType.STRING)
    velocity?: string;

    @Column(DataType.INTEGER)
    week?: number;
}
