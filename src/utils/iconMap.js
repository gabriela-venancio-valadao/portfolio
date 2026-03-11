import React from 'react';
import {
  SiReact, SiRedux, SiStyledcomponents, SiNodedotjs, SiPhp,
  SiDocker, SiGit, SiLinux, SiOpenai, SiSpring,
  SiJavascript, SiExpress, SiVite, SiCss3, SiHtml5,
  SiMysql
} from 'react-icons/si';
import {
  FaShieldAlt, FaGraduationCap, FaBook, FaGuitar,
  FaGlobe, FaKey, FaCodeBranch, FaJava, FaDatabase, FaCode
} from 'react-icons/fa';

const iconMap = {
  SiReact,
  SiRedux,
  SiStyledcomponents,
  SiNodedotjs,
  SiPhp,
  SiSpring,
  SiDocker,
  SiGit,
  SiLinux,
  SiOpenai,
  SiJavascript,
  SiExpress,
  SiVite,
  SiCss3,
  SiHtml5,
  SiMysql,
  FaShieldAlt,
  FaGraduationCap,
  FaBook,
  FaGuitar,
  FaGlobe,
  FaKey,
  FaCodeBranch,
  FaJava,
  FaDatabase,
  FaCode,
};

const colorMap = {
  SiReact:           '#61DAFB',
  SiRedux:           '#764ABC',
  SiStyledcomponents:'#DB7093',
  SiNodedotjs:       '#339933',
  SiPhp:             '#777BB4',
  SiSpring:          '#6DB33F',
  SiDocker:          '#2496ED',
  SiGit:             '#F05032',
  SiLinux:           '#FCC624',
  SiOpenai:          '#10A37F',
  SiJavascript:      '#F7DF1E',
  SiExpress:         '#FFFFFF',
  SiVite:            '#646CFF',
  SiCss3:            '#1572B6',
  SiHtml5:           '#E34F26',
  SiMysql:           '#4479A1',
  FaJava:            '#ED8B00',
  FaShieldAlt:       '#4FC3F7',
  FaGraduationCap:   '#A78BFA',
  FaBook:            '#F59E0B',
  FaGuitar:          '#F87171',
  FaGlobe:           '#38BDF8',
  FaKey:             '#FBBF24',
  FaCodeBranch:      '#F05032',
  FaDatabase:        '#A78BFA',
  FaCode:            '#4298B8',
};

export const IconComponent = ({ name, size = 22, className = '', style = {} }) => {
  const Icon = iconMap[name];
  if (!Icon) return null;
  const color = colorMap[name] || 'currentColor';
  return <Icon size={size} className={className} style={{ color, ...style }} />;
};
