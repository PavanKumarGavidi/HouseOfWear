import { Drawer } from '../ui/Drawer';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Size Guide">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">How to Measure</h3>
          <div className="space-y-3 text-sm text-brand-700 dark:text-brand-300">
            <p>
              <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
            </p>
            <p>
              <strong>Waist:</strong> Measure around your natural waistline, typically just above the belly button.
            </p>
            <p>
              <strong>Hips:</strong> Measure around the fullest part of your hips, keeping the tape horizontal.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Size Chart (in inches)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-200 dark:border-brand-700">
                  <th className="text-left py-2 px-3 font-medium">Size</th>
                  <th className="text-center py-2 px-3 font-medium">Chest</th>
                  <th className="text-center py-2 px-3 font-medium">Waist</th>
                  <th className="text-center py-2 px-3 font-medium">Hips</th>
                </tr>
              </thead>
              <tbody className="text-brand-700 dark:text-brand-300">
                <tr className="border-b border-brand-100 dark:border-brand-800">
                  <td className="py-2 px-3 font-medium">XS</td>
                  <td className="text-center py-2 px-3">34-36</td>
                  <td className="text-center py-2 px-3">28-30</td>
                  <td className="text-center py-2 px-3">34-36</td>
                </tr>
                <tr className="border-b border-brand-100 dark:border-brand-800">
                  <td className="py-2 px-3 font-medium">S</td>
                  <td className="text-center py-2 px-3">36-38</td>
                  <td className="text-center py-2 px-3">30-32</td>
                  <td className="text-center py-2 px-3">36-38</td>
                </tr>
                <tr className="border-b border-brand-100 dark:border-brand-800">
                  <td className="py-2 px-3 font-medium">M</td>
                  <td className="text-center py-2 px-3">38-40</td>
                  <td className="text-center py-2 px-3">32-34</td>
                  <td className="text-center py-2 px-3">38-40</td>
                </tr>
                <tr className="border-b border-brand-100 dark:border-brand-800">
                  <td className="py-2 px-3 font-medium">L</td>
                  <td className="text-center py-2 px-3">40-42</td>
                  <td className="text-center py-2 px-3">34-36</td>
                  <td className="text-center py-2 px-3">40-42</td>
                </tr>
                <tr className="border-b border-brand-100 dark:border-brand-800">
                  <td className="py-2 px-3 font-medium">XL</td>
                  <td className="text-center py-2 px-3">42-44</td>
                  <td className="text-center py-2 px-3">36-38</td>
                  <td className="text-center py-2 px-3">42-44</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">XXL</td>
                  <td className="text-center py-2 px-3">44-46</td>
                  <td className="text-center py-2 px-3">38-40</td>
                  <td className="text-center py-2 px-3">44-46</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-brand-50 dark:bg-brand-900 rounded-lg p-4">
          <p className="text-sm text-brand-700 dark:text-brand-300">
            <strong>Fit Tip:</strong> If you're between sizes, we recommend sizing up for a relaxed fit or sizing down for a more tailored look.
          </p>
        </div>
      </div>
    </Drawer>
  );
}
