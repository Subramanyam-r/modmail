import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ modelName: "thread", timestamps: false })
export default class ThreadModel extends Model {

    @Column({ primaryKey: true, type: DataType.STRING })
    id!: string;

    @Column({ type: DataType.STRING })
    channel_id!: string;

    @Column({ type: DataType.ENUM("OPEN", "CLOSED") })
    status!: string;

    @Column({ type: DataType.STRING })
    user_id!: string;

    @Column({ type: DataType.STRING })
    username!: string;

    @Column({ type: DataType.TIME })
    created_at!: string;

    @Column({ type: DataType.TIME })
    closed_at!: string;
}