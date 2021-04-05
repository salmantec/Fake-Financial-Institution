import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import AccountType from "../../seed/models/AccountType";
import Bank from "../../seed/models/Bank";
import AccountTransaction from "./AccountTransaction";
import Customer from "./Customer";

@Table({
  tableName: "customer_account",
})
export default class CustomerAccount extends Model<CustomerAccount> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => Bank)
  @Column({ type: DataType.INTEGER, allowNull: false })
  bankId: number;

  @BelongsTo(() => Bank)
  bank: Bank;

  @ForeignKey(() => AccountType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  accountTypeId: number;

  @BelongsTo(() => AccountType)
  accountType: AccountType;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  accountNo: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  branchName: string;

  @HasMany(() => AccountTransaction)
  accountTransaction: AccountTransaction[];

  @CreatedAt
  @UpdatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
