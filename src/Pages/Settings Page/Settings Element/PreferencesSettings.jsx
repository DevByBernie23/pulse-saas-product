import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';

const translations = {
  English: {
    preferences: 'Preferences',
    description: 'Customize your Pulse experience.',
    theme: 'Theme',
    language: 'Language',
  },

  French: {
    preferences: 'Préférences',
    description: 'Personnalisez votre expérience Pulse.',
    theme: 'Thème',
    language: 'Langue',
  },

  Spanish: {
    preferences: 'Preferencias',
    description: 'Personaliza tu experiencia de Pulse.',
    theme: 'Tema',
    language: 'Idioma',
  },
}

const PreferencesSettings = () => {
  const { theme, setTheme } = useTheme();
  const {language, setLanguage} = useLanguage()
  const currentTranslations = translations[language]

 
  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>{currentTranslations.preferences}</h2>
        <p>{currentTranslations.description}</p>
      </div>

      <div className="form-group">
        <label>{currentTranslations.theme}</label>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="form-group">
        <label>{currentTranslations.language}</label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

    </div>
  );
};

export default PreferencesSettings;