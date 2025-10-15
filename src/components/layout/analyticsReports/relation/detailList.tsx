import React from 'react';
import { relationStyles } from './style';
import { ShoppingBag } from 'lucide-react';

interface ProductPenetrationProps {
  durationData: Array<{
    duration: string;
    customers: number;
    percentage: number;
    avgPremium: number;
    avgProducts: number;
    productDistribution: {
      oneProduct: number;
      twoProducts: number;
      threeOrMore: number;
    };
    color: string;
  }>;
}

export function ProductPenetrationByDuration({
  durationData,
}: ProductPenetrationProps) {
  return (
    <div className={relationStyles.productPenetrationCard}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <ShoppingBag className="h-5 w-5 text-green-600" />
        </div>
        <h4 className={relationStyles.chartTitle}>
          Product Penetration by Duration
        </h4>
      </div>
      <div className="space-y-4">
        {durationData.map((item, index) => (
          <div key={index} className={relationStyles.productItem}>
            <div className={relationStyles.productHeader}>
              <span className={relationStyles.productTitle}>
                {item.duration}
              </span>
              <span className={relationStyles.productAvg}>
                {item.avgProducts} avg products
              </span>
            </div>
            <div className={relationStyles.productDetails}>
              <div className={relationStyles.productRow}>
                <span className={relationStyles.productLabel}>
                  1 Product: {item.productDistribution.oneProduct}
                </span>
                <span className={relationStyles.productPercentage}>
                  {(
                    (item.productDistribution.oneProduct / item.customers) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className={relationStyles.productRow}>
                <span className={relationStyles.productLabel}>
                  2 Products: {item.productDistribution.twoProducts}
                </span>
                <span className={relationStyles.productPercentage}>
                  {(
                    (item.productDistribution.twoProducts / item.customers) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className={relationStyles.productRow}>
                <span className={relationStyles.productLabel}>
                  3+ Products: {item.productDistribution.threeOrMore}
                </span>
                <span className={relationStyles.productPercentage}>
                  {(
                    (item.productDistribution.threeOrMore / item.customers) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
            {/* Progress bar showing multi-product penetration */}
            <div className={relationStyles.progressBar}>
              <div
                className={relationStyles.progressFill}
                style={{
                  width: `${
                    ((item.productDistribution.twoProducts +
                      item.productDistribution.threeOrMore) /
                      item.customers) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
