import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

const databaseURL = process.env.DATABASE_URL;
if (!databaseURL) throw new Error("Database url not found");
export const sequelize = new Sequelize(databaseURL, {
  dialect: "postgres",
  logging: false
});

export class Link extends Model {
  public id!: string;
  public url!: string;
  public createdAt!: Date;
}

export class Click extends Model {
  public id!: string;
  public ip!: string;
  public referer!: string;
  public userAgent!: string;
  public LinkId!: string;
  public createdAt!: Date;
}

export async function initModels() {
  Link.init(
    {
      id: {
        type: DataTypes.STRING(16),
        primaryKey: true
      },
      url: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: "Link",
      tableName: "links"
    }
  );

  Click.init(
    {
      id: {
        type: DataTypes.STRING(16),
        primaryKey: true
      },
      ip: {
        type: DataTypes.STRING(24)
      },
      referer: {
        type: DataTypes.TEXT
      },
      userAgent: {
        type: DataTypes.TEXT
      },
      LinkId: {
        type: DataTypes.STRING(16),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Click",
      tableName: "clicks"
    }
  );

  Click.belongsTo(Link, {
    onDelete: "CASCADE"
  });
  Link.hasMany(Click);
  await sequelize.sync();
}
