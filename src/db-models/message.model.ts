import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ modelName: "messages", timestamps: false })
export default class MessageModel extends Model {

    @Column({ primaryKey: true, type: DataType.TEXT })
    id!: string;

    @Column({ type: DataType.STRING })
    message_id!: string;

    @Column({ type: DataType.STRING })
    content!: string;

    @Column({ type: DataType.STRING })
    sender_id!: string;

    @Column({ type: DataType.STRING })
    sender_username!: string;

    @Column({ type: DataType.STRING })
    thread_id!: string;

    @Column({ type: DataType.BOOLEAN })
    is_mod_response!: boolean;
}