import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

function debug(result: JSON) {
  console.log("result length: ", result.length);
}

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

    // debug(customers);
    res.json(customers);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/02", async (_: any, res: any) => {
  try {
    const customers = await prisma.employee.findMany({
      select: {
        sin: true,
        Branch: {
          select: {
            branchName: true,
            managerSIN: true,
          },
        },
        salary: true,
      },
    });

    const result = customers
      .map((el: any) => ({
        sin: el.sin,
        branchName: el.Branch.branchName,
        salary: el.salary,
        salaryGap: el.Branch.managerSIN - el.salary,
      }))
      .sort(function (a: any, b: any) {
        return -a.salaryGap + b.salaryGap;
      });

    res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/03", async (_: any, res: any) => {
  try {
    const temp = await prisma.customer.findMany({
      select: {
        income: true,
      },
      where: {
        lastName: "Butler",
      },
    });

    const max = Math.max(...temp.map((o: any) => o.income));

    const customers = await prisma.customer.findMany({
      select: {
        firstName: true,
        lastName: true,
        income: true,
      },
      where: {
        income: {
          gt: 2 * max,
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

    debug(customers);
    res.json(customers);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;
