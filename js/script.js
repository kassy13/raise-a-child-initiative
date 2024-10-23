// Mock data for causes
const causesData = [
    {
        id: 1,
        title: "Help build schools for children in need",
        image: "images/img_1.jpg",
        description: "In many parts of the world, access to quality education is a privilege rather than a right. Countless children, particularly in rural and underdeveloped regions, are deprived of the basic opportunity to attend school. This cause aims to bridge the educational gap by constructing schools in underserved areas. Education is a fundamental building block of personal and societal growth, and without it, children are often left with limited options for their futures. By building schools, we provide a safe and conducive environment for children to learn, grow, and thrive. The initiative focuses not only on erecting school buildings but also on equipping them with essential learning materials, hiring qualified teachers, and ensuring that the schools are sustainable in the long term. Your support helps to provide hope and opportunity for children who, without access to education, would be trapped in a cycle of poverty. With a target to build multiple schools across regions where the need is greatest, this project has already garnered substantial support but still requires more donations to achieve its ambitious goals. Let’s join hands to create a brighter future for these children, where education becomes the tool that opens doors to endless possibilities. Every dollar donated brings us one step closer to making a lasting difference in their lives.",
        donation: "$32,919",
        progress: "80%",
        donor: "James Smith",
        caption:"80%",
        category:"School"
    },
    {
        id: 2,
        title: "Provide clean water and sanitation",
        image: "images/img_2.jpg",
        description: "Clean water is a basic human right, yet millions of people around the world still lack access to safe drinking water. This cause is dedicated to providing clean water and proper sanitation facilities to communities in need. The consequences of not having clean water are dire: children miss school due to water-borne diseases, people spend hours walking to distant water sources, and entire communities are exposed to the risks of contaminated water. This initiative aims to change that by building wells, installing water filtration systems, and educating communities on proper sanitation and hygiene practices. By improving access to clean water, we can prevent disease outbreaks, improve health, and enhance the quality of life for entire communities. The project has already made significant progress in several villages, but the need remains great. Each donation helps to bring clean, safe water closer to families who have never experienced it before. Your contribution can help ensure that future generations don’t have to face the same struggles. Together, we can make clean water accessible to everyone, promoting health, dignity, and development for those who need it most.",
        donation: "$20,500",
        progress: "60%",
        donor: "Sarah Johnson",
         caption:"60%",
         category:"health"
    },
    {
        id: 3,
        title: "Support small businesses and startups",
        image: "images/img_3.jpg",
        description: "Small businesses are the backbone of any economy, and supporting them is vital to creating sustainable livelihoods, especially in underdeveloped regions. This cause is dedicated to helping entrepreneurs and small business owners build and scale their ventures, providing them with the tools, resources, and financial support they need to succeed. Many of these businesses are started by individuals with innovative ideas but without the necessary capital to turn those ideas into reality. From agriculture to artisan crafts, these businesses have the potential to uplift entire communities by providing jobs, fostering innovation, and driving economic growth. However, the challenges they face—such as limited access to finance, lack of business training, and unstable markets—are significant. Through this initiative, we aim to provide seed funding, mentorship, and business development services to small businesses in rural and urban areas alike. Your donation will go directly toward empowering these entrepreneurs, giving them the chance to create not just a business but a better life for themselves and their communities. With your help, we can build a world where entrepreneurship is a viable path out of poverty and a driver of community resilience.",
        donation: "$15,800",
        progress: "50%",
        donor: "Mark Davis",
         caption:"50%",
         category:"Livelihood"
    },
    {
        id: 4,
        title: "Support education initiatives for children in underserved communities",
        image: "images/child1.jpg",
        description: "Education is the key to breaking the cycle of poverty, but for many children in underserved communities, this key is often out of reach. This initiative aims to support education efforts in regions where children face significant barriers to learning, such as the lack of schools, teachers, and resources. Our mission is to provide these children with access to quality education, ensuring that they have the opportunity to learn, grow, and build a brighter future. This program supports not only the construction of schools but also the provision of learning materials, teacher training, and student support programs. By focusing on holistic educational development, we aim to create a system where children are not only able to attend school but are also encouraged to stay in school and complete their education. The long-term benefits of education are undeniable: educated children grow up to become adults who are more likely to have stable jobs, healthier lives, and stronger communities. However, we cannot do this alone. Every donation helps to build classrooms, purchase textbooks, and provide scholarships to children in need. Together, we can help break down the barriers to education and give these children the chance to achieve their dreams.",
        donation: "$2,500",
        progress: "40%",
        donor: "Sarah Johnson",
         caption:"40%",
         category:"Education"
    },
    {
        id: 5,
        title: "Help communities recover from natural disasters by providing emergency relief",
        image: "images/child2.jpg",
        description: "Natural disasters can strike at any time, leaving devastation in their wake and affecting millions of lives. This cause focuses on helping communities recover from such disasters by providing immediate emergency relief and long-term recovery assistance. From hurricanes and earthquakes to floods and wildfires, the impact of natural disasters is profound and far-reaching. Families lose their homes, livelihoods are destroyed, and entire communities are left vulnerable. The road to recovery can be long and difficult, but with your support, we can help provide the necessary resources to rebuild lives and restore hope. Emergency relief efforts focus on providing food, clean water, medical care, and temporary shelter in the immediate aftermath of a disaster. However, recovery doesn’t stop there. We also work with communities to rebuild infrastructure, restore livelihoods, and help them prepare for future disasters. Every contribution goes directly toward aiding those who have lost everything in the face of disaster. By supporting this cause, you are helping to rebuild homes, restore communities, and give hope to those who need it most. Together, we can make a difference in the lives of disaster-affected families and help them find their way back to normalcy.",
        donation: "$22,800",
        progress: "80%",
        donor: "Mark Davis",
         caption:"80%",
         category:"Disaster"
    }
];


// Function to get query parameter
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get(param))
    return params.get(param);
}

// Get the cause ID from the URL
const causeId = getQueryParam("id");

// Find the cause data by ID
const cause = causesData.find(c => c.id == causeId);

// If the cause is found, update the page content
if (cause) {
    document.getElementById("cause-title").textContent = cause.title;
    document.getElementById("cause-image").src = cause.image;
    document.getElementById("cause-description").textContent = cause.description;
    document.getElementById("donation-amount").textContent = cause.donation;
    document.getElementById("progress-text").textContent = cause.progress +" " + "complete";
    document.getElementById("progress-percentage").style.width = cause.progress;
    document.getElementById("donor-name").textContent = cause.donor;
    document.getElementById("category").textContent=cause.category;
    document.getElementById("category").classList.add(cause.category.toLowerCase());
}

const apikey=pk_live_3233d1d47c10c1659fa0dc70e5b1b88c