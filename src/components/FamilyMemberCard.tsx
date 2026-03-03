import React from 'react';
import { Search, Plus, Phone, Mail, MapPin, Cake, Star, ArrowLeft, MoreVertical, X, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FamilyMember } from '../types';
import { cn } from './layout/MobileContainer';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onClick: (member: FamilyMember) => void;
}

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(member)}
      className="flex items-center p-4 mb-3 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:border-indigo-100 transition-colors"
    >
      <div className="relative">
        <img
          src={member.avatarUrl || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random`}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
        />
        {member.isEmergencyContact && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full border-2 border-white">
            <Star size={10} fill="currentColor" />
          </div>
        )}
      </div>
      <div className="ml-4 flex-1 overflow-hidden">
        <h3 className="font-semibold text-slate-900 truncate">
          {member.firstName} {member.lastName}
        </h3>
        <p className="text-sm text-slate-500">{member.relation}</p>
      </div>
      <div className="flex gap-2">
        <a
          href={`tel:${member.phoneNumber}`}
          onClick={(e) => e.stopPropagation()}
          className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
        >
          <Phone size={18} />
        </a>
      </div>
    </motion.div>
  );
};