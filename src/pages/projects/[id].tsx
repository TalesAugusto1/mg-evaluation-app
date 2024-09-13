"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/projects/${id}`)
        .then(response => response.json())
        .then(data => setProject(data));
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetails;
