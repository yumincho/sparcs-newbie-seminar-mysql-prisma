import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/01", async (_: any, res: any) => {
  try {
    const customers = await prisma.customer.findMany({
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
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/02", async (_: any, res: any) => {
  try {
    /* todo */
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

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
