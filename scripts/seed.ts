const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data: [
              
                { name: "Entrepreneurship & Business Development" },
                { name: "Finance and Accounting" },
                { name: "Technology and Innovation" },
                { name: "Skill Development & Vocational Training" },
                { name: "Marketing & Sales" },
                { name: "Management & Leadership" },
                { name: "Government Schemes & Policies" },
                { name: "Soft Skills & Communication" },
                { name: "Sector-Specific Training" },

            ]
        });

        console.log("Success");
    }catch(error){
        console.log("Error seeding database categories:", error);
    }finally{
        await database.$disconnect();
    }
}
main();