import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOutIcon,
  UsersIcon,
  MessageSquareIcon,
  PlusIcon,
  Trash2Icon,
  Edit2Icon,
  XIcon,
  EyeIcon,
  DatabaseIcon } from
'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { supabase } from '../lib/supabase';
import { TeamMember, ContactMessage } from '../lib/types';
export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'team' | 'messages'>('team');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  // Form state for adding/editing team member
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    photo_url: '',
    bio: ''
  });
  // State for viewing full message
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const isAuth = localStorage.getItem('metro_admin_auth');
      if (!session && !isAuth) {
        navigate('/admin');
        return;
      }
      fetchData();
    };
    checkAuth();
  }, [navigate]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const [teamRes, msgRes] = await Promise.all([
      supabase.from('teams').select('*').order('created_at', {
        ascending: false
      }),
      supabase.from('contact_messages').select('*').order('created_at', {
        ascending: false
      })]
      );
      if (teamRes.data) setTeam(teamRes.data);
      if (msgRes.data) setMessages(msgRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('metro_admin_auth');
    navigate('/admin');
  };
  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      title: '',
      email: '',
      phone: '',
      photo_url: '',
      bio: ''
    });
    setShowForm(true);
  };
  const handleOpenEditForm = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      title: member.title,
      email: member.email || '',
      phone: member.phone || '',
      photo_url: member.photo_url || '',
      bio: member.bio || ''
    });
    setShowForm(true);
  };
  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase.
        from('teams').
        update(formData).
        eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('teams').insert([formData]);
        if (error) throw error;
      }
      setShowForm(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert('Error saving team member');
    }
  };
  const handleDeleteTeam = async (id: string) => {
    if (!confirm('Are you sure you want to remove this attorney?')) return;
    try {
      const { error } = await supabase.from('teams').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert('Error deleting team member');
    }
  };
  const handleSeedAttorneys = async () => {
    if (
    !confirm('This will add 7 sample attorneys to your directory. Continue?'))

    return;
    const sampleAttorneys = [
    {
      name: 'Victoria Sterling',
      title: 'Managing Partner',
      email: 'v.sterling@metrolaw.com',
      phone: '(212) 555-0101',
      photo_url:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      bio: 'Victoria Sterling brings over two decades of formidable experience in high-stakes corporate litigation. As Managing Partner, she has engineered landmark victories for Fortune 500 companies and is renowned for her strategic brilliance in the courtroom.'
    },
    {
      name: 'Jonathan Hayes',
      title: 'Senior Partner',
      email: 'j.hayes@metrolaw.com',
      phone: '(212) 555-0102',
      photo_url:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      bio: 'A veteran of complex commercial disputes, Jonathan Hayes specializes in breach of contract and international trade law. His meticulous approach to discovery and aggressive negotiation tactics have recovered millions for our clients.'
    },
    {
      name: 'Elena Rostova',
      title: 'Partner, Family Law',
      email: 'e.rostova@metrolaw.com',
      phone: '(212) 555-0103',
      photo_url:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
      bio: 'Elena Rostova leads our Marriage & Divorce Management practice. She provides discreet, authoritative counsel in high-net-worth divorces, complex asset division, and sensitive custody matters with profound empathy and fierce advocacy.'
    },
    {
      name: 'Dr. Marcus Thorne',
      title: 'Phd. Attorney, Estate Law',
      email: 'm.thorne@metrolaw.com',
      phone: '(212) 555-0104',
      photo_url:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800',
      bio: "Holding a Ph.D. in Jurisprudence, Dr. Thorne is the firm's leading authority on Inheritance Management. He navigates complex probate litigation and international wealth transfers with unparalleled academic and practical expertise."
    },
    {
      name: 'David Chen',
      title: 'Senior Associate',
      email: 'd.chen@metrolaw.com',
      phone: '(212) 555-0105',
      photo_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      bio: "David Chen is a rising star in our Debt Collection and Judgement Enforcement division. His relentless pursuit of hidden assets and mastery of post-judgment remedies ensures that our clients' victories are financially realized."
    },
    {
      name: 'Rachel Vance',
      title: 'Associate Attorney',
      email: 'r.vance@metrolaw.com',
      phone: '(212) 555-0106',
      photo_url:
      'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=800',
      bio: 'Rachel Vance focuses on construction law and Mechanic Liens. She expertly navigates the strict statutory deadlines required to protect the payment rights of contractors, subcontractors, and suppliers across the state.'
    },
    {
      name: 'Michael Gallagher',
      title: 'Of Counsel',
      email: 'm.gallagher@metrolaw.com',
      phone: '(212) 555-0107',
      photo_url:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      bio: 'With 40 years of trial experience, Michael Gallagher serves as Of Counsel for our most complex litigation matters. His courtroom presence and strategic insights are invaluable assets to the Metro Law Firm team.'
    }];

    try {
      setLoading(true);
      const { error } = await supabase.from('teams').insert(sampleAttorneys);
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error seeding sample attorneys');
      setLoading(false);
    }
  };
  return (
    <PageTransition className="min-h-screen bg-metro-black pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-playfair text-white">
              Admin Dashboard
            </h1>
            <p className="text-metro-gold text-sm tracking-wider uppercase mt-1">
              Metro Law Firm System
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-metro-muted hover:text-white transition-colors text-sm uppercase tracking-wider">

            <LogOutIcon className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-metro-border mb-8">
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium tracking-wider uppercase transition-colors relative ${activeTab === 'team' ? 'text-metro-gold' : 'text-metro-muted hover:text-white'}`}>

            <UsersIcon className="w-4 h-4" /> Team Management
            {activeTab === 'team' &&
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-metro-gold" />
            }
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium tracking-wider uppercase transition-colors relative ${activeTab === 'messages' ? 'text-metro-gold' : 'text-metro-muted hover:text-white'}`}>

            <MessageSquareIcon className="w-4 h-4" /> Inquiries
            {activeTab === 'messages' &&
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-metro-gold" />
            }
          </button>
        </div>

        {/* Content */}
        {loading ?
        <div className="text-center py-20 text-metro-muted">
            Loading data...
          </div> :

        <div className="bg-metro-surface border border-metro-border p-6">
            {/* TEAM TAB */}
            {activeTab === 'team' &&
          <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-playfair text-white">
                    Attorney Directory
                  </h2>
                  <div className="flex gap-4">
                    <button
                  onClick={handleSeedAttorneys}
                  className="flex items-center gap-2 border border-metro-border text-metro-muted px-4 py-2 text-sm font-medium uppercase tracking-wider hover:text-white hover:border-metro-gold transition-colors">

                      <DatabaseIcon className="w-4 h-4" /> Seed Sample Data
                    </button>
                    <button
                  onClick={() =>
                  showForm ? setShowForm(false) : handleOpenAddForm()
                  }
                  className="flex items-center gap-2 bg-metro-gold text-metro-black px-4 py-2 text-sm font-medium uppercase tracking-wider hover:bg-white transition-colors">

                      {showForm ?
                  'Cancel' :

                  <>
                          <PlusIcon className="w-4 h-4" /> Add Attorney
                        </>
                  }
                    </button>
                  </div>
                </div>

                {showForm &&
            <form
              onSubmit={handleSaveTeam}
              className="bg-metro-black border border-metro-border p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 relative">

                    <div className="md:col-span-2 mb-2 border-b border-metro-border pb-2">
                      <h3 className="text-white font-playfair text-lg">
                        {editingId ?
                  'Edit Attorney Profile' :
                  'Add New Attorney'}
                      </h3>
                    </div>

                    <input
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
                }
                className="bg-metro-surface border border-metro-border p-3 text-white focus:border-metro-gold outline-none" />

                    <input
                required
                placeholder="Title (e.g. Senior Partner)"
                value={formData.title}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
                }
                className="bg-metro-surface border border-metro-border p-3 text-white focus:border-metro-gold outline-none" />

                    <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
                }
                className="bg-metro-surface border border-metro-border p-3 text-white focus:border-metro-gold outline-none" />

                    <input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value
                })
                }
                className="bg-metro-surface border border-metro-border p-3 text-white focus:border-metro-gold outline-none" />

                    <input
                placeholder="Photo URL"
                value={formData.photo_url}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  photo_url: e.target.value
                })
                }
                className="bg-metro-surface border border-metro-border p-3 text-white focus:border-metro-gold outline-none md:col-span-2" />

                    <textarea
                placeholder="Biography"
                value={formData.bio}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  bio: e.target.value
                })
                }
                className="bg-metro-surface border border-metro-border p-3 text-white focus:border-metro-gold outline-none md:col-span-2"
                rows={4} />

                    <button
                type="submit"
                className="bg-metro-gold text-metro-black py-3 font-medium uppercase tracking-wider md:col-span-2 hover:bg-white transition-colors mt-2">

                      {editingId ? 'Update Attorney' : 'Save Attorney'}
                    </button>
                  </form>
            }

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-metro-body">
                    <thead className="text-xs text-metro-muted uppercase tracking-wider bg-metro-black border-b border-metro-border">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.length === 0 ?
                  <tr>
                          <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-metro-muted">

                            No attorneys found.
                          </td>
                        </tr> :

                  team.map((member) =>
                  <tr
                    key={member.id}
                    className="border-b border-metro-border hover:bg-metro-black/50 transition-colors">

                            <td className="px-6 py-4 font-medium text-white">
                              {member.name}
                            </td>
                            <td className="px-6 py-4 text-metro-gold">
                              {member.title}
                            </td>
                            <td className="px-6 py-4">
                              {member.email}
                              <br />
                              {member.phone}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                          onClick={() => handleOpenEditForm(member)}
                          className="text-metro-muted hover:text-white transition-colors p-2"
                          title="Edit">

                                  <Edit2Icon className="w-4 h-4" />
                                </button>
                                <button
                          onClick={() => handleDeleteTeam(member.id)}
                          className="text-red-500 hover:text-red-400 transition-colors p-2"
                          title="Delete">

                                  <Trash2Icon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                  )
                  }
                    </tbody>
                  </table>
                </div>
              </div>
          }

            {/* MESSAGES TAB */}
            {activeTab === 'messages' &&
          <div>
                <h2 className="text-xl font-playfair text-white mb-6">
                  Client Inquiries
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-metro-body">
                    <thead className="text-xs text-metro-muted uppercase tracking-wider bg-metro-black border-b border-metro-border">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Message Preview</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.length === 0 ?
                  <tr>
                          <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-metro-muted">

                            No messages found.
                          </td>
                        </tr> :

                  messages.map((msg) =>
                  <tr
                    key={msg.id}
                    className="border-b border-metro-border hover:bg-metro-black/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedMessage(msg)}>

                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(
                        msg.created_at || ''
                      ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-white block">
                                {msg.name}
                              </span>
                              <span className="text-xs text-metro-muted">
                                {msg.email}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-metro-gold">
                              {msg.subject}
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate">
                              {msg.message}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                        className="text-metro-muted hover:text-white transition-colors p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(msg);
                        }}>

                                <EyeIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                  )
                  }
                    </tbody>
                  </table>
                </div>
              </div>
          }
          </div>
        }
      </div>

      {/* Message Detail Modal */}
      {selectedMessage &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-metro-surface border border-metro-border w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-metro-border bg-metro-black">
              <h3 className="text-xl font-playfair text-white">
                Inquiry Details
              </h3>
              <button
              onClick={() => setSelectedMessage(null)}
              className="text-metro-muted hover:text-white transition-colors">

                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs tracking-widest uppercase text-metro-muted mb-1">
                    From
                  </p>
                  <p className="text-white">{selectedMessage.name}</p>
                  <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-metro-gold text-sm hover:underline">

                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-metro-muted mb-1">
                    Date
                  </p>
                  <p className="text-white">
                    {new Date(
                    selectedMessage.created_at || ''
                  ).toLocaleString()}
                  </p>
                  {selectedMessage.phone &&
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="text-metro-gold text-sm hover:underline block mt-1">

                      {selectedMessage.phone}
                    </a>
                }
                </div>
              </div>

              <div className="border-t border-metro-border pt-6">
                <p className="text-xs tracking-widest uppercase text-metro-muted mb-2">
                  Subject
                </p>
                <p className="text-white font-medium text-lg">
                  {selectedMessage.subject}
                </p>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase text-metro-muted mb-2">
                  Message
                </p>
                <div className="bg-metro-black border border-metro-border p-4 text-metro-body whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-metro-border bg-metro-black flex justify-end">
              <a
              href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
              className="bg-metro-gold text-metro-black px-6 py-2 text-sm font-medium uppercase tracking-wider hover:bg-white transition-colors">

                Reply via Email
              </a>
            </div>
          </div>
        </div>
      }
    </PageTransition>);

}