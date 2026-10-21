import { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';
import { twMerge } from '../../utils/cn';

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

// Mock addresses
const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    street: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    street: '456 Park Avenue',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    isDefault: false,
  },
];

export function AddressBook() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({});

  if (!user) return null;

  const handleAdd = () => {
    if (formData.name && formData.phone && formData.street && formData.city && formData.state && formData.pincode) {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        name: formData.name!,
        phone: formData.phone!,
        street: formData.street!,
        city: formData.city!,
        state: formData.state!,
        pincode: formData.pincode!,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
      setShowAddForm(false);
      setFormData({});
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.name && formData.phone && formData.street && formData.city && formData.state && formData.pincode) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId
            ? { ...addr, ...formData }
            : addr
        )
      );
      setEditingId(null);
      setFormData({});
    }
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const startEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData(address);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
          My Addresses
        </h1>
        <Button onClick={() => { setShowAddForm(true); setEditingId(null); setFormData({}); }} leftIcon={<Plus className="w-4 h-4" />}>
          Add New
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Phone Number"
              placeholder="+91 98765 43210"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <Input
            label="Street Address"
            placeholder="123 Main Street, Apartment 4B"
            value={formData.street || ''}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="mt-4"
          />
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <Input
              label="City"
              placeholder="Mumbai"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              label="State"
              placeholder="Maharashtra"
              value={formData.state || ''}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            <Input
              label="Pincode"
              placeholder="400001"
              value={formData.pincode || ''}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={editingId ? handleUpdate : handleAdd} fullWidth>
              {editingId ? 'Update Address' : 'Save Address'}
            </Button>
            <Button onClick={editingId ? cancelEdit : () => setShowAddForm(false)} variant="outline" fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border border-brand-200 dark:border-brand-700 rounded-lg p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{address.name}</p>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brand-600 dark:text-brand-400">{address.street}</p>
                  <p className="text-sm text-brand-600 dark:text-brand-400">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-brand-600 dark:text-brand-400">Phone: {address.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                    aria-label="Set as default"
                    title="Set as default"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => startEdit(address)}
                  className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                  aria-label="Edit address"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
                  aria-label="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showAddForm && (
        <div className="text-center py-16">
          <MapPin className="w-16 h-16 mx-auto text-brand-300 dark:text-brand-700 mb-4" />
          <h2 className="text-xl font-medium mb-2">No addresses saved</h2>
          <p className="text-brand-600 dark:text-brand-400 mb-6">
            Add an address to speed up checkout
          </p>
          <Button onClick={() => setShowAddForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
}
