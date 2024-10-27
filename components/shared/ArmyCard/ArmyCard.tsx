// NFTPage.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import './ArmyCard.css'; // Updated CSS file name if necessary

interface Unit {
  id: number;
  name: string;
  attack: number;
  defense: number;
  speed: number;
  range: number;
  abilities: string;
  upkeepCost: {
    food: number;
    wood: number;
    stone: number;
    brass: number;
    iron: number;
    gold: number;
  };
  isActive: boolean;
  image: string;
}

const NFTPage: React.FC = () => {
  // Static example data for the Army Units
  const exampleUnits: Unit[] = [
    {
      id: 1,
      name: 'Footman',
      attack: 50,
      defense: 50,
      speed: 5,
      range: 1,
      abilities: '',
      upkeepCost: {
        food: 5,
        wood: 1,
        stone: 0,
        brass: 0,
        iron: 0,
        gold: 0,
      },
      isActive: true,
      image: '/img/footman.webp', // Placeholder image path
    },
    {
      id: 2,
      name: 'Archer',
      attack: 40,
      defense: 30,
      speed: 5,
      range: 7,
      abilities: 'Can attack flying units',
      upkeepCost: {
        food: 4,
        wood: 2,
        stone: 0,
        brass: 0,
        iron: 0,
        gold: 0,
      },
      isActive: true,
      image: '/img/archer.webp',
    },
    {
      id: 3,
      name: 'Knight',
      attack: 70,
      defense: 60,
      speed: 7,
      range: 1,
      abilities: 'Charge attack',
      upkeepCost: {
        food: 6,
        wood: 0,
        stone: 0,
        brass: 0,
        iron: 3,
        gold: 0,
      },
      isActive: true,
      image: '/img/knight.webp',
    },
    // Add more units as needed
  ];

  return (
    <div className="nft-page-container">
      <h2 className="page-title">Your Army Deck</h2>
      <div className="army-deck">
        <div className="army-cards">
          {exampleUnits.map((unit) => (
            <div key={unit.id} className="army-card">
              {/* Unit Image */}
              <div className="unit-image">
                <Image
                  src={unit.image}
                  alt={unit.name}
                  width={150}
                  height={150}
                />
              </div>

              {/* Unit Name */}
              <h3 className="unit-name">{unit.name}</h3>

              {/* Unit Details */}
              <div className="unit-details">
                {/* Unit Stats */}
                <div className="unit-stats">
                  <h4 className="section-title">Unit Stats</h4>
                  <ul>
                    <li>Attack: {unit.attack}</li>
                    <li>Defense: {unit.defense}</li>
                    <li>Speed: {unit.speed}</li>
                    <li>Range: {unit.range}</li>
                    <li>Abilities: {unit.abilities || 'None'}</li>
                  </ul>
                </div>

                {/* Upkeep Costs */}
                <div className="upkeep-costs">
                  <h4 className="section-title">Upkeep Cost</h4>
                  <ul>
                    <li>Food: {unit.upkeepCost.food}</li>
                    <li>Wood: {unit.upkeepCost.wood}</li>
                    <li>Stone: {unit.upkeepCost.stone}</li>
                    <li>Brass: {unit.upkeepCost.brass}</li>
                    <li>Iron: {unit.upkeepCost.iron}</li>
                    <li>Gold: {unit.upkeepCost.gold}</li>
                  </ul>
                </div>
              </div>

              {/* Status */}
              <p className="status">
                Status: {unit.isActive ? 'Active' : 'Inactive'}
              </p>

              {/* Action Buttons */}
              <div className="unit-actions">
                <button className="action-button">
                  {unit.isActive ? 'Deactivate Unit' : 'Activate Unit'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
