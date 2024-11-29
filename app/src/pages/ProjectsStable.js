// import * as React from 'react';
// import { useState } from 'react';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Typography from '@mui/material/Typography';
// import ProjectCard from './items/ProjectCard';

// // import { allProjects } from 'contentlayer/generated';

// export default function ProjectMain() {
//   const [selectedSkill, setSelectedSkill] = useState('All');
//   const [filteredProjects, setFilteredProjects] = useState(projectsData);

//   // Extract unique skills
//   const skills = [
//     'All',
//     ...new Set(
//       projectsData.flatMap((project) =>
//         project.skills.map((skill) => skill.name)
//       )
//     ),
//   ];

//   const filterProjects = (skill) => {
//     setSelectedSkill(skill);

//     if (skill === 'All') {
//       setFilteredProjects(projectsData); // Reset to all projects
//     } else {
//       setFilteredProjects(
//         projectsData.filter((project) =>
//           project.skills.some((projectSkill) => projectSkill.name === skill)
//         )
//       );
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h1" gutterBottom>
//         Projects
//       </Typography>
//       <Typography>From Concepts to Code: My Experimental Projects</Typography>

//       {/* Filter Chips */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           gap: 1,
//           marginTop: 2,
//           flexWrap: 'wrap',
//         }}
//       >
//         {skills.map((skill) => (
//           <Chip
//             key={skill}
//             label={skill}
//             clickable
//             onClick={() => filterProjects(skill)}
//             color={selectedSkill === skill ? 'primary' : 'default'}
//             sx={{
//               fontSize: '1rem',          // Adjust font size
//               minHeight: '36px',         // Ensure the height is consistent
//               padding: '0 16px',         // Adjust horizontal padding
//               lineHeight: '36px',        // Align text vertically
//               borderRadius: '24px',      // Rounded corners
//               display: 'inline-flex',    // Ensure proper alignment
//               alignItems: 'center',      // Vertically center the text
//               justifyContent: 'center',  // Horizontally center the text
//             }}
//           />
//         ))}
//       </Box>

//       {/* Rendering first Projects as featured and rest as normal */}
//       <Grid container spacing={2} sx={{ marginTop: 2 }}>
//         {filteredProjects.map((project, index) => {
//           if (index < 2) { // First two projects
//             return (
//               <Grid item xs={12} sm={6} md={6} lg={6} key={index}
//                 sx={{ pl: index === 0 ? '0px !important' : undefined }}
//               >
//                 <ProjectCard
//                   project={project}
//                   onFocus={() => {}}
//                   onBlur={() => {}}
//                   focusedCardIndex={-1}
//                   cardIndex={index} // Pass the current index
//                 />
//               </Grid>
//             );
//           } else { // Remaining projects
//             return (
//               <Grid item xs={12} sm={6} md={4} lg={4} key={index}
//                 sx={{ pl: (index - 2) % 3 === 0 ? '0px !important' : undefined }}
//               >
//                 <ProjectCard
//                   project={project}
//                   onFocus={() => {}}
//                   onBlur={() => {}}
//                   focusedCardIndex={-1}
//                   cardIndex={index} // Pass the current index
//                 />
//               </Grid>
//             );
//           }
//         })}
//       </Grid>
//     </div>
//   );
// }