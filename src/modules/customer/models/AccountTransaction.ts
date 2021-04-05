import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import TransactionType from "../../seed/models/TransactionType";
import AccountType from "../../seed/models/AccountType";
import CustomerAccount from "./CustomerAccount";

@Table({
  tableName: "account_transaction",
})
export default class AccountTransaction extends Model<AccountTransaction> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => CustomerAccount)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customerAccountId: number;

  @BelongsTo(() => CustomerAccount, "customerAccountId")
  customerAccount: CustomerAccount;

  @ForeignKey(() => TransactionType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  transactionTypeId: number;

  @BelongsTo(() => TransactionType)
  TransactionType: TransactionType;

  @ForeignKey(() => CustomerAccount)
  @Column({ type: DataType.INTEGER, allowNull: true })
  transactionAccountId: number;

  @BelongsTo(() => CustomerAccount, "transactionAccountId")
  transactionAccount: CustomerAccount;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  balance: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  transactionAmount: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  summary: string;

  @CreatedAt
  @UpdatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
