import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Users,
  Package,
  DollarSign,
  Clock,
  ShoppingCart,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductPenetrationByDuration } from './detailList';
import { colors, relationStyles, chartConfig } from './style';
import {
  DurationOfRelationshipProps,
  DurationData,
  RelationSummaryMetrics,
  InsightCategory,
} from '@/constants/interfaces/relation';
import { ValueUnit } from '@/constants/enums/relation';
import {
  selectDurationData,
  selectSummaryMetrics,
  selectInsights,
} from '@/redux/slices/relationSlice';

export function DurationOfRelationship({
  valueUnit,
}: DurationOfRelationshipProps) {
  const [showProducts, setShowProducts] = useState(true);

  // Get data from Redux store
  const durationData = useSelector(selectDurationData);
  const summaryMetrics = useSelector(selectSummaryMetrics);
  const insights = useSelector(selectInsights);

  const getFormattedValue = (value: number) => {
    if (valueUnit === ValueUnit.CRORE) {
      return `₹${(value / 10000000).toFixed(2)}`;
    } else if (valueUnit === ValueUnit.LAKH) {
      return `₹${(value / 100000).toFixed(2)}`;
    } else if (valueUnit === ValueUnit.THOUSANDS) {
      return `₹${(value / 1000).toFixed(2)}`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8">
      {/* Summary Metrics */}
      <div className={relationStyles.summaryMetrics}>
        <div className={relationStyles.metricCard.blue}>
          <div className="flex items-center gap-2 mb-2">
            <Users className={`${relationStyles.metricIcon} text-blue-600`} />
            <span className={`${relationStyles.metricLabel} text-blue-900`}>
              Total Customers
            </span>
          </div>
          <div className={`${relationStyles.metricValue} text-blue-600`}>
            {summaryMetrics.totalCustomers.toLocaleString()}
          </div>
          <div className={`${relationStyles.metricSubtext} text-blue-700`}>
            Across all durations
          </div>
        </div>

        <div className={relationStyles.metricCard.green}>
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw
              className={`${relationStyles.metricIcon} text-green-600`}
            />
            <span className={`${relationStyles.metricLabel} text-green-900`}>
              Retention Rate
            </span>
          </div>
          <div className={`${relationStyles.metricValue} text-green-600`}>
            {summaryMetrics.retentionRate}%
          </div>
          <div className={`${relationStyles.metricSubtext} text-green-700`}>
            Overall retention
          </div>
        </div>

        <div className={relationStyles.metricCard.purple}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign
              className={`${relationStyles.metricIcon} text-purple-600`}
            />
            <span className={`${relationStyles.metricLabel} text-purple-900`}>
              Avg Premium
            </span>
          </div>
          <div className={`${relationStyles.metricValue} text-purple-600`}>
            {getFormattedValue(summaryMetrics.avgPremium)}
          </div>
          <div className={`${relationStyles.metricSubtext} text-purple-700`}>
            Per customer
          </div>
        </div>

        <div className={relationStyles.metricCard.amber}>
          <div className="flex items-center gap-2 mb-2">
            <Package
              className={`${relationStyles.metricIcon} text-amber-600`}
            />
            <span className={`${relationStyles.metricLabel} text-amber-900`}>
              Cross-sell Success
            </span>
          </div>
          <div className={`${relationStyles.metricValue} text-amber-600`}>
            {summaryMetrics.crossSellSuccess}%
          </div>
          <div className={`${relationStyles.metricSubtext} text-amber-700`}>
            Multi-product rate
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className={relationStyles.headerSection}>
        <div className="flex items-center justify-between ">
          <div>
            <h3 className={relationStyles.headerTitle}>
              Customer Relationship Duration & Product Analysis
            </h3>
            <p className={relationStyles.headerSubtitle}>
              Distribution of customers by relationship length with product
              penetration insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="show-products"
                checked={showProducts}
                onCheckedChange={setShowProducts}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label
                htmlFor="show-products"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Number of Products
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Avg: {summaryMetrics.avgRelationshipDuration} years
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Avg: {summaryMetrics.avgProductsPerCustomer} products
              </span>
            </div>
          </div>
        </div>

        {/* Main Chart - Conditional: Stacked Bar Chart or Simple Bar Chart */}
        <div className={relationStyles.chartContainer}>
          <div className={relationStyles.chartCard}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                {showProducts ? (
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                ) : (
                  <Users className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <h4 className={relationStyles.chartTitle}>
                {showProducts
                  ? 'Customer Distribution by Relationship Duration & Product Holdings'
                  : 'Customer Distribution by Relationship Duration'}
              </h4>
            </div>
            <ResponsiveContainer width="100%" height={chartConfig.height}>
              <BarChart data={durationData} margin={chartConfig.margin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="duration" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      if (showProducts) {
                        const total =
                          data.productDistribution.oneProduct +
                          data.productDistribution.twoProducts +
                          data.productDistribution.threeOrMore;
                        return (
                          <div className={`${relationStyles.tooltip} min-w-72`}>
                            <p className={relationStyles.tooltipTitle}>
                              {label}
                            </p>
                            <div className={relationStyles.tooltipContent}>
                              <div className={relationStyles.tooltipRow}>
                                <span className={relationStyles.tooltipLabel}>
                                  Total Customers:
                                </span>
                                <span className={relationStyles.tooltipValue}>
                                  {data.customers.toLocaleString()}
                                </span>
                              </div>
                              <div className={relationStyles.tooltipRow}>
                                <span className={relationStyles.tooltipLabel}>
                                  Avg Premium:
                                </span>
                                <span className={relationStyles.tooltipValue}>
                                  {getFormattedValue(data.avgPremium)}
                                </span>
                              </div>
                              <div className={relationStyles.tooltipDivider}>
                                <p
                                  className={
                                    relationStyles.tooltipProductHeader
                                  }
                                >
                                  Product Distribution:
                                </p>
                                <div
                                  className={relationStyles.tooltipProductRow}
                                >
                                  <div
                                    className={
                                      relationStyles.tooltipProductItem
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`${relationStyles.tooltipProductColor} bg-blue-500`}
                                      />
                                      <span
                                        className={relationStyles.tooltipLabel}
                                      >
                                        1 Product:
                                      </span>
                                    </div>
                                    <span
                                      className={relationStyles.tooltipValue}
                                    >
                                      {data.productDistribution.oneProduct} (
                                      {(
                                        (data.productDistribution.oneProduct /
                                          total) *
                                        100
                                      ).toFixed(1)}
                                      %)
                                    </span>
                                  </div>
                                  <div
                                    className={
                                      relationStyles.tooltipProductItem
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`${relationStyles.tooltipProductColor} bg-green-500`}
                                      />
                                      <span
                                        className={relationStyles.tooltipLabel}
                                      >
                                        2 Products:
                                      </span>
                                    </div>
                                    <span
                                      className={relationStyles.tooltipValue}
                                    >
                                      {data.productDistribution.twoProducts} (
                                      {(
                                        (data.productDistribution.twoProducts /
                                          total) *
                                        100
                                      ).toFixed(1)}
                                      %)
                                    </span>
                                  </div>
                                  <div
                                    className={
                                      relationStyles.tooltipProductItem
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`${relationStyles.tooltipProductColor} bg-amber-500`}
                                      />
                                      <span
                                        className={relationStyles.tooltipLabel}
                                      >
                                        3+ Products:
                                      </span>
                                    </div>
                                    <span
                                      className={relationStyles.tooltipValue}
                                    >
                                      {data.productDistribution.threeOrMore} (
                                      {(
                                        (data.productDistribution.threeOrMore /
                                          total) *
                                        100
                                      ).toFixed(1)}
                                      %)
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className={relationStyles.tooltipDivider}>
                                <div className={relationStyles.tooltipRow}>
                                  <span
                                    className={relationStyles.tooltipHighlight}
                                  >
                                    Avg Products:
                                  </span>
                                  <span
                                    className={relationStyles.tooltipHighlight}
                                  >
                                    {data.avgProducts}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className={`${relationStyles.tooltip} min-w-64`}>
                            <p className={relationStyles.tooltipTitle}>
                              {label}
                            </p>
                            <div className={relationStyles.tooltipContent}>
                              <div className={relationStyles.tooltipRow}>
                                <span className={relationStyles.tooltipLabel}>
                                  Customers:
                                </span>
                                <span className={relationStyles.tooltipValue}>
                                  {data.customers.toLocaleString()}
                                </span>
                              </div>
                              <div className={relationStyles.tooltipRow}>
                                <span className={relationStyles.tooltipLabel}>
                                  Percentage:
                                </span>
                                <span className={relationStyles.tooltipValue}>
                                  {data.percentage}%
                                </span>
                              </div>
                              <div className={relationStyles.tooltipRow}>
                                <span className={relationStyles.tooltipLabel}>
                                  Avg Premium:
                                </span>
                                <span className={relationStyles.tooltipValue}>
                                  {getFormattedValue(data.avgPremium)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                    return null;
                  }}
                />
                {showProducts ? (
                  <>
                    <Bar
                      dataKey="productDistribution.oneProduct"
                      stackId="products"
                      fill={colors.primary}
                      name="1 Product"
                      radius={chartConfig.stackedBarRadius}
                    />
                    <Bar
                      dataKey="productDistribution.twoProducts"
                      stackId="products"
                      fill={colors.secondary}
                      name="2 Products"
                      radius={chartConfig.stackedBarRadius}
                    />
                    <Bar
                      dataKey="productDistribution.threeOrMore"
                      stackId="products"
                      fill={colors.tertiary}
                      name="3+ Products"
                      radius={chartConfig.topStackedBarRadius}
                    />
                  </>
                ) : (
                  <Bar
                    dataKey="customers"
                    fill={colors.primary}
                    radius={chartConfig.barRadius}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>

            {/* Legend - Only show for product view */}
            {showProducts && (
              <div className={relationStyles.legend}>
                <div className={relationStyles.legendItem}>
                  <div
                    className={relationStyles.legendColor}
                    style={{ backgroundColor: colors.primary }}
                  />
                  <span className={relationStyles.legendText}>1 Product</span>
                </div>
                <div className={relationStyles.legendItem}>
                  <div
                    className={relationStyles.legendColor}
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <span className={relationStyles.legendText}>2 Products</span>
                </div>
                <div className={relationStyles.legendItem}>
                  <div
                    className={relationStyles.legendColor}
                    style={{ backgroundColor: colors.tertiary }}
                  />
                  <span className={relationStyles.legendText}>3+ Products</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Penetration by Duration */}
          <ProductPenetrationByDuration durationData={durationData} />
        </div>
      </div>

      {/* Key Insights */}
      <div className={relationStyles.insightsSection}>
        <h4 className={relationStyles.insightsTitle}>
          Key Relationship & Product Insights
        </h4>
        <div className={relationStyles.insightsGrid}>
          {insights.map((insight, index) => (
            <div key={index} className={relationStyles.insightCategory}>
              <h5
                className={`${relationStyles.insightHeader} text-${insight.color}-800`}
              >
                {insight.title}
              </h5>
              <ul className={relationStyles.insightList}>
                {insight.insights.map((item, itemIndex) => (
                  <li key={itemIndex} className={relationStyles.insightItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
