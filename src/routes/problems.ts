import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

// function debug(result: JSON) {
//   console.log("result length: ", result.length);
// }

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
    const max = Math.max(
      ...(
        await prisma.customer.findMany({
          select: {
            income: true,
          },
          where: {
            lastName: "Butler",
          },
        })
      ).map((o: any) => o.income)
    );

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

    res.json(customers);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/04", async (_: any, res: any) => {
  try {
    const customerIDSet = await prisma.customer.findMany({
      select: {
        customerID: true,
      },
      distinct: "customerID",
      where: {
        Owns: {
          some: {
            Account: {
              Branch: {
                branchName: {
                  in: ["London", "Latveria"],
                },
              },
            },
          },
        },
      },
      orderBy: [{ customerID: "asc" }],
    });

    const customers = await prisma.customer.findMany({
      select: {
        customerID: true,
        income: true,
        Owns: {
          select: {
            accNumber: true,
            Account: {
              select: {
                Branch: {
                  select: { branchName: true },
                },
              },
            },
          },
        },
      },
      where: {
        AND: [
          {
            income: {
              gt: 80000,
            },
          },
          {
            customerID: {
              in: customerIDSet.map((el) => el.customerID),
            },
          },
        ],
      },
      orderBy: [{ customerID: "asc" }],
    });

    res.json(customers);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/05", async (_: any, res: any) => {
  try {
    const customerInfo = await prisma.customer.findMany({
      select: {
        customerID: true,
        Owns: {
          select: {
            accNumber: true,
            Account: {
              select: {
                type: true,
                balance: true,
              },
            },
          },
        },
      },
      orderBy: [{ customerID: "asc" }],
    });

    const customers = customerInfo.map(
      (el: {
        customerID: number;
        Owns: {
          accNumber: number;
          Account: {
            type: string | null;
            balance: string | null;
          };
        }[];
      }) => ({
        customerID: el.customerID,
        Owns: el.Owns.filter((own) => {
          return own.Account.type === "BUS" || own.Account.type === "SAV";
        }).map((own) => ({
          type: own.Account.type,
          acc: own.accNumber,
        })),
      })
    );

    const filtered = customers
      .filter((el) => {
        return el.Owns.length !== 0;
      })
      .sort(function (a: any, b: any) {
        return -a.salaryGap + b.salaryGap;
      });

    console.log(filtered);
    res.json(filtered);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;
