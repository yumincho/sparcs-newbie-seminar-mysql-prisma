"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/01", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield prisma.customer.findMany({
            select: {
                firstName: true,
                lastName: true,
                income: true,
            },
            where: {
                income: {
                    gt: 50000,
                    lt: 60000,
                },
            },
            orderBy: [
                {
                    income: "desc",
                },
                { lastName: "asc" },
                { firstName: "asc" },
            ],
        });
        console.log(customers.length, customers);
    }
    catch (e) {
        return res.status(500).json({ error: e });
    }
}));
router.get("/02", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* todo */
    }
    catch (e) {
        return res.status(500).json({ error: e });
    }
}));
module.exports = router;
// router.get("/00", async (_: any, res: any) => {
//   try {
//     /* todo */
//   } catch (e) {
//     return res.status(500).json({ error: e });
//   }
// });
// async function main() {
//   const [employee, branch] = await Promise.all([
//     prisma.employee.findMany(),
//     prisma.branch.findMany(),
//   ]);
//   const joined = [...employee, ...branch];
//   console.log(joined);
//   const customers = await prisma.employee.findMany({
//     select: {
//       sin: true,
//       salary: true,
//       Branch_Employee_branchNumberToBranch: {
//         select: {
//           branchName: true,
//         },
//       },
//     },
//   });
//   customers.map(() => {});
//   console.log(customers.length, customers);
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
