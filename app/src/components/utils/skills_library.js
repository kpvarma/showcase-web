// utils/skillsLibrary.js

const skillsFolder = '/images/skills'

const skills_mapping = {
    python: "python.png",
    ruby: "ruby.png",
    nodejs: "nodejs.png",
    javascript: "javascript.png",

    rubyOnRails: "ruby-on-rails.png",
    django: "django.png",
    fastapi: "fastapi.png",
    express: "expressjs.png",

    reactjs: "reactjs.png",
    nextjs: "nextjs.png",
    vuejs: "vuejs.png",
    nuxtjs: "nuxtjs.png",

    hadoop: "hadoop.png",
    spark: "spark.png",
    mongodb: "mongodb.png",
    postgresql: "postgresql.png",
    mysql: "mysql.png",
    redis: "redis.png",
    elasticsearch: "elasticsearch.png",

    github: "github.png",
    docker: "docker.png",
    kubernetes: "kubernetes.png",
    kafka: "kafka.png",
    aws: "aws.png",
    
  };
  
  // Helper function to resolve skill URLs
  const getSkillUrl = (skillName) => {
    const fileName = skills_mapping[skillName];
    if (!fileName) {
      throw new Error(`Skill "${skillName}" not found in the skills mapping.`);
    }
    
    if (process.env.NODE_ENV === "development") {
      // Use the local url /pubilc/...
      return `${skillsFolder}/${fileName}`;
    } else {
      // Use the remote URL for production
      return `http://assets.kpvarma.com/${skillsFolder}/${fileName}`;
    }
  };
  
  // Generate the list of all skills with their URLs
  const getAllSkills = () => {
    return Object.keys(skills_mapping).map((skillName) => ({
      name: skillName,
      url: getSkillUrl(skillName),
    }));
  };
  
  // Export individual skill access and the list of all skills
  const skillsLibrary = new Proxy(
    {},
    {
      get: (_, skillName) => {
        if (skillName === "list") {
          return getAllSkills();
        }
        return getSkillUrl(skillName);
      },
    }
  );
  
  export default skillsLibrary;